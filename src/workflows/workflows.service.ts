import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Workflow, WorkflowDocument, WorkflowEdge, WorkflowNode } from './schemas/workflow.schema';
import {
  WorkflowRun,
  WorkflowRunDocument,
  WorkflowRunStatus,
  WorkflowRunStep,
} from './schemas/workflow-run.schema';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowsQueryDto } from './dto/workflows-query.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { paginate } from '../common/utils/paginate';
import { TasksService } from '../tasks/tasks.service';
import { EmailService } from '../email/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';
import { LeadsService } from '../leads/leads.service';
import { DealsService } from '../deals/deals.service';

interface NodeResult {
  step: WorkflowRunStep;
  /** Branch label ('true'/'false') this condition node resolved to, if any. */
  branch?: string;
}

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectModel(Workflow.name) private readonly workflowModel: Model<WorkflowDocument>,
    @InjectModel(WorkflowRun.name) private readonly workflowRunModel: Model<WorkflowRunDocument>,
    private readonly tasksService: TasksService,
    private readonly emailService: EmailService,
    private readonly notificationsService: NotificationsService,
    private readonly leadsService: LeadsService,
    private readonly dealsService: DealsService,
  ) {}

  create(createWorkflowDto: CreateWorkflowDto) {
    const created = new this.workflowModel(createWorkflowDto);
    return created.save();
  }

  findAll(query: WorkflowsQueryDto) {
    const filter: QueryFilter<Workflow> = {};
    if (query.status !== undefined) {
      filter.status = query.status;
    }
    return paginate(this.workflowModel, filter, query);
  }

  async findOne(id: string) {
    const workflow = await this.workflowModel.findById(id).exec();
    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }
    return workflow;
  }

  async update(id: string, updateWorkflowDto: UpdateWorkflowDto) {
    const updated = await this.workflowModel
      .findByIdAndUpdate(id, updateWorkflowDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.workflowModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }
    return deleted;
  }

  async findRuns(workflowId: string, query: PaginationQueryDto) {
    // Ensure the workflow exists so /workflows/:id/runs 404s consistently
    // with the other nested-under-:id endpoints.
    await this.findOne(workflowId);
    return paginate(this.workflowRunModel, { workflowId }, query);
  }

  /**
   * Real (synchronous-style, one-pass) graph walker: loads the workflow,
   * resolves entry node(s), and walks `edges` from each entry node executing
   * a handler per `node.type`. No cycle support is needed per spec - a
   * back-edge into an already-visited ancestor on the current DFS path is
   * recorded as a failed step for that node and that branch stops there,
   * rather than looping forever.
   */
  async execute(workflowId: string, triggerPayload?: Record<string, any>): Promise<WorkflowRun> {
    const workflow = await this.findOne(workflowId);

    const run = new this.workflowRunModel({
      workflowId,
      startedAt: new Date(),
      status: WorkflowRunStatus.RUNNING,
      steps: [],
      triggerPayload,
    });

    const nodes: WorkflowNode[] = workflow.nodes ?? [];
    const edges: WorkflowEdge[] = workflow.edges ?? [];
    const nodesById = new Map(nodes.map((n) => [n.id, n]));
    const outgoing = new Map<string, WorkflowEdge[]>();
    const hasIncoming = new Set<string>();
    for (const edge of edges) {
      if (!outgoing.has(edge.source)) outgoing.set(edge.source, []);
      outgoing.get(edge.source)!.push(edge);
      hasIncoming.add(edge.target);
    }

    // Entry nodes: explicit trigger-typed nodes, plus any node nobody points
    // at (covers workflows built without a dedicated trigger node type).
    const entryNodes = nodes.filter((n) => this.isTriggerNode(n) || !hasIncoming.has(n.id));

    const steps: WorkflowRunStep[] = [];
    const executed = new Set<string>();
    let failed = false;

    const walk = async (node: WorkflowNode, ancestors: Set<string>): Promise<void> => {
      if (executed.has(node.id)) {
        // Already ran this node from another branch (diamond convergence) -
        // don't execute or record it twice.
        return;
      }
      if (ancestors.has(node.id)) {
        steps.push({
          nodeId: node.id,
          type: node.type ?? 'unknown',
          status: 'failed',
          error: `Cycle detected: node ${node.id} is its own ancestor - stopping this branch`,
          timestamp: new Date(),
        });
        failed = true;
        return;
      }

      executed.add(node.id);
      const { step, branch } = await this.runNode(node, triggerPayload);
      steps.push(step);
      if (step.status === 'failed') {
        failed = true;
      }

      const nextAncestors = new Set(ancestors);
      nextAncestors.add(node.id);

      const nodeEdges = outgoing.get(node.id) ?? [];
      for (const edge of nodeEdges) {
        if (branch && !this.edgeMatchesBranch(edge, branch)) {
          continue;
        }
        const target = nodesById.get(edge.target);
        if (target) {
          await walk(target, nextAncestors);
        }
      }
    };

    for (const entry of entryNodes) {
      await walk(entry, new Set());
    }

    run.steps = steps;
    run.status = failed ? WorkflowRunStatus.FAILED : WorkflowRunStatus.SUCCESS;
    run.finishedAt = new Date();
    const saved = await run.save();
    await this.capRuns(workflowId);
    return saved;
  }

  /** Keeps only the latest MAX_RUNS_PER_WORKFLOW runs per workflow. */
  private async capRuns(workflowId: string): Promise<void> {
    const MAX_RUNS_PER_WORKFLOW = 50;
    try {
      const stale = await this.workflowRunModel
        .find({ workflowId })
        .sort({ startedAt: -1 })
        .skip(MAX_RUNS_PER_WORKFLOW)
        .select('_id')
        .exec();
      if (stale.length) {
        await this.workflowRunModel
          .deleteMany({ _id: { $in: stale.map((r) => r._id) } })
          .exec();
      }
    } catch {
      // capping is best-effort; never fail a run because pruning failed
    }
  }

  /** Deletes all stored runs for a workflow. */
  async clearRuns(workflowId: string): Promise<{ deleted: number }> {
    await this.findOne(workflowId);
    const res = await this.workflowRunModel.deleteMany({ workflowId }).exec();
    return { deleted: res.deletedCount ?? 0 };
  }

  private isTriggerNode(node: WorkflowNode): boolean {
    return String(node.type ?? '').toLowerCase().startsWith('trigger');
  }

  /**
   * Branching model: a condition node resolves to 'true' or 'false'; an
   * outgoing edge only fires if its own label (edge.data.branch, or the
   * XYFlow display `edge.label`, case-insensitively) matches that value.
   * Edges carrying no branch label at all always fire. This is simpler than
   * modelling full boolean expressions per edge, and matches the frontend's
   * existing `label: 'True' | 'False'` edges (see WorkflowDetail.tsx).
   */
  private edgeMatchesBranch(edge: WorkflowEdge, branch: string): boolean {
    const label = String(edge.data?.branch ?? edge.label ?? '').toLowerCase();
    if (!label) return true;
    return label === branch;
  }

  /** Dispatches a single node to its handler and returns the recorded step. */
  private async runNode(
    node: WorkflowNode,
    triggerPayload?: Record<string, any>,
  ): Promise<NodeResult> {
    const timestamp = new Date();
    const kind = this.resolveKind(node);

    try {
      if (kind === 'trigger') {
        return {
          step: {
            nodeId: node.id,
            type: node.type ?? 'trigger',
            status: 'success',
            output: { note: 'trigger node - entry point, no action taken' },
            timestamp,
          },
        };
      }

      if (kind === 'condition') {
        return this.handleCondition(node, triggerPayload, timestamp);
      }

      // action.* (or unrecognized node types are treated as actions too)
      if (this.isCreateTaskAction(node)) {
        return this.handleCreateTask(node, triggerPayload, timestamp);
      }

      const action = this.resolveActionName(node);
      if (action === 'send_email') {
        return this.handleSendEmail(node, triggerPayload, timestamp);
      }
      if (action === 'notify_team') {
        return this.handleNotifyTeam(node, timestamp);
      }
      if (action === 'update_crm') {
        return this.handleUpdateCrm(node, triggerPayload, timestamp);
      }

      return this.handleLog(node, timestamp);
    } catch (err) {
      return {
        step: {
          nodeId: node.id,
          type: node.type ?? 'unknown',
          status: 'failed',
          error: err instanceof Error ? err.message : String(err),
          timestamp,
        },
      };
    }
  }

  private resolveKind(node: WorkflowNode): 'trigger' | 'condition' | 'action' {
    const rawType = String(node.type ?? '').toLowerCase();
    if (rawType.startsWith('trigger')) return 'trigger';
    if (rawType.startsWith('condition')) return 'condition';
    return 'action';
  }

  private isCreateTaskAction(node: WorkflowNode): boolean {
    const rawType = String(node.type ?? '').toLowerCase();
    const icon = String(node.data?.icon ?? '').toLowerCase();
    return rawType.includes('create_task') || icon === 'task';
  }

  /**
   * action.create_task: a real side effect via TasksService.create, using
   * fields off node.data (falling back to sensible defaults) plus whatever
   * the trigger payload carried.
   */
  private async handleCreateTask(
    node: WorkflowNode,
    triggerPayload: Record<string, any> | undefined,
    timestamp: Date,
  ): Promise<NodeResult> {
    const data = node.data ?? {};
    const task = await this.tasksService.create({
      title: data.title || data.label || `Workflow task: ${node.id}`,
      description: data.description,
      assignee: data.assignee,
      relatedTo: data.relatedTo || triggerPayload?.relatedTo,
      priority: data.priority,
      category: data.category,
      status: data.status,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      dueTime: data.dueTime,
    } as any);

    return {
      step: {
        nodeId: node.id,
        type: 'action.create_task',
        status: 'success',
        output: { taskId: String((task as any)._id), title: task.title },
        timestamp,
      },
    };
  }

  /** condition.*: trivial equals/not_equals/contains check against triggerPayload. */
  private handleCondition(
    node: WorkflowNode,
    triggerPayload: Record<string, any> | undefined,
    timestamp: Date,
  ): NodeResult {
    const { field, operator, value } = node.data ?? {};
    let result = true;
    if (field) {
      const actual = triggerPayload?.[field];
      switch (operator) {
        case 'not_equals':
          result = actual !== value;
          break;
        case 'contains':
          result = typeof actual === 'string' && typeof value === 'string' && actual.includes(value);
          break;
        case 'equals':
        default:
          result = actual === value;
      }
    }
    // No field configured (the frontend currently only stores a free-text
    // description on condition nodes) -> default to true so the workflow
    // keeps flowing down the "true" branch rather than silently dead-ending.

    return {
      step: {
        nodeId: node.id,
        type: node.type ?? 'condition',
        status: 'success',
        output: { result },
        timestamp,
      },
      branch: result ? 'true' : 'false',
    };
  }

  /** Extracts the bare action name (e.g. 'send_email') from an action.* node type. */
  private resolveActionName(node: WorkflowNode): string {
    const rawType = String(node.type ?? '').toLowerCase();
    const withoutPrefix = rawType.startsWith('action.')
      ? rawType.slice('action.'.length)
      : rawType;
    return withoutPrefix;
  }

  /**
   * action.send_email: sends via EmailService using node config (to/subject/
   * body). When SMTP is not configured (EmailService throws a
   * ServiceUnavailableException) the step is recorded as a skipped success
   * rather than failing the whole run.
   */
  private async handleSendEmail(
    node: WorkflowNode,
    triggerPayload: Record<string, any> | undefined,
    timestamp: Date,
  ): Promise<NodeResult> {
    const data = node.data ?? {};
    const to = data.to || triggerPayload?.email || triggerPayload?.to;
    const subject = data.subject || data.label || 'Notification from workflow';
    const body = data.body || data.message || data.description || '';

    if (!to) {
      return {
        step: {
          nodeId: node.id,
          type: 'action.send_email',
          status: 'success',
          output: { skipped: 'no recipient (to) configured' },
          timestamp,
        },
      };
    }

    try {
      const sent = await this.emailService.send({ to, subject, body } as any);
      return {
        step: {
          nodeId: node.id,
          type: 'action.send_email',
          status: 'success',
          output: { to, subject, messageId: String((sent as any)?._id ?? '') },
          timestamp,
        },
      };
    } catch (err) {
      // Email not configured (or transient send failure) — do not crash the run.
      return {
        step: {
          nodeId: node.id,
          type: 'action.send_email',
          status: 'success',
          output: {
            skipped: 'email not configured',
            reason: err instanceof Error ? err.message : String(err),
          },
          timestamp,
        },
      };
    }
  }

  /** action.notify_team: creates a notification from node config (title/message/type). */
  private async handleNotifyTeam(
    node: WorkflowNode,
    timestamp: Date,
  ): Promise<NodeResult> {
    const data = node.data ?? {};
    const type = this.toNotificationType(data.type);
    const notification = await this.notificationsService.create({
      title: data.title || data.label || 'Workflow notification',
      message: data.message || data.description || '',
      type,
    });
    return {
      step: {
        nodeId: node.id,
        type: 'action.notify_team',
        status: 'success',
        output: { notificationId: String((notification as any)._id) },
        timestamp,
      },
    };
  }

  private toNotificationType(value: unknown): NotificationType {
    const raw = String(value ?? '').toLowerCase();
    const match = (Object.values(NotificationType) as string[]).find((t) => t === raw);
    return (match as NotificationType) ?? NotificationType.INFO;
  }

  /**
   * action.update_crm: performs a real update on a target entity from node
   * config: { entity: 'lead'|'deal', id, patch }. `id` and `patch` may also be
   * sourced from the trigger payload. Unknown entities record a clear error.
   */
  private async handleUpdateCrm(
    node: WorkflowNode,
    triggerPayload: Record<string, any> | undefined,
    timestamp: Date,
  ): Promise<NodeResult> {
    const data = node.data ?? {};
    const entity = String(data.entity ?? '').toLowerCase();
    const id = data.id || triggerPayload?.id || triggerPayload?.[`${entity}Id`];
    const patch = data.patch || data.update || {};

    if (!entity || !id) {
      return {
        step: {
          nodeId: node.id,
          type: 'action.update_crm',
          status: 'failed',
          error: `update_crm requires 'entity' and 'id' (got entity='${entity}', id='${id ?? ''}')`,
          timestamp,
        },
      };
    }

    let updated: any;
    switch (entity) {
      case 'lead':
        updated = await this.leadsService.update(id, patch);
        break;
      case 'deal':
        updated = await this.dealsService.update(id, patch);
        break;
      case 'task':
        updated = await this.tasksService.update(id, patch);
        break;
      default:
        return {
          step: {
            nodeId: node.id,
            type: 'action.update_crm',
            status: 'failed',
            error: `Unknown entity '${entity}' for update_crm (supported: lead, deal, task)`,
            timestamp,
          },
        };
    }

    return {
      step: {
        nodeId: node.id,
        type: 'action.update_crm',
        status: 'success',
        output: { entity, id: String((updated as any)?._id ?? id) },
        timestamp,
      },
    };
  }

  /** action.log and any other unrecognized action type: an honest no-op. */
  private handleLog(node: WorkflowNode, timestamp: Date): NodeResult {
    return {
      step: {
        nodeId: node.id,
        type: node.type ?? 'action.log',
        status: 'success',
        output: { note: `no-op: handler not implemented for type ${node.type}` },
        timestamp,
      },
    };
  }
}
