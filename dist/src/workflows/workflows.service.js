"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const workflow_schema_1 = require("./schemas/workflow.schema");
const workflow_run_schema_1 = require("./schemas/workflow-run.schema");
const paginate_1 = require("../common/utils/paginate");
const tasks_service_1 = require("../tasks/tasks.service");
const email_service_1 = require("../email/email.service");
const notifications_service_1 = require("../notifications/notifications.service");
const notification_schema_1 = require("../notifications/schemas/notification.schema");
const leads_service_1 = require("../leads/leads.service");
const deals_service_1 = require("../deals/deals.service");
let WorkflowsService = class WorkflowsService {
    workflowModel;
    workflowRunModel;
    tasksService;
    emailService;
    notificationsService;
    leadsService;
    dealsService;
    constructor(workflowModel, workflowRunModel, tasksService, emailService, notificationsService, leadsService, dealsService) {
        this.workflowModel = workflowModel;
        this.workflowRunModel = workflowRunModel;
        this.tasksService = tasksService;
        this.emailService = emailService;
        this.notificationsService = notificationsService;
        this.leadsService = leadsService;
        this.dealsService = dealsService;
    }
    create(createWorkflowDto) {
        const created = new this.workflowModel(createWorkflowDto);
        return created.save();
    }
    findAll(query) {
        const filter = {};
        if (query.status !== undefined) {
            filter.status = query.status;
        }
        return (0, paginate_1.paginate)(this.workflowModel, filter, query);
    }
    async findOne(id) {
        const workflow = await this.workflowModel.findById(id).exec();
        if (!workflow) {
            throw new common_1.NotFoundException(`Workflow ${id} not found`);
        }
        return workflow;
    }
    async update(id, updateWorkflowDto) {
        const updated = await this.workflowModel
            .findByIdAndUpdate(id, updateWorkflowDto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Workflow ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const deleted = await this.workflowModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Workflow ${id} not found`);
        }
        return deleted;
    }
    async findRuns(workflowId, query) {
        await this.findOne(workflowId);
        return (0, paginate_1.paginate)(this.workflowRunModel, { workflowId }, query);
    }
    async execute(workflowId, triggerPayload) {
        const workflow = await this.findOne(workflowId);
        const run = new this.workflowRunModel({
            workflowId,
            startedAt: new Date(),
            status: workflow_run_schema_1.WorkflowRunStatus.RUNNING,
            steps: [],
            triggerPayload,
        });
        const nodes = workflow.nodes ?? [];
        const edges = workflow.edges ?? [];
        const nodesById = new Map(nodes.map((n) => [n.id, n]));
        const outgoing = new Map();
        const hasIncoming = new Set();
        for (const edge of edges) {
            if (!outgoing.has(edge.source))
                outgoing.set(edge.source, []);
            outgoing.get(edge.source).push(edge);
            hasIncoming.add(edge.target);
        }
        const entryNodes = nodes.filter((n) => this.isTriggerNode(n) || !hasIncoming.has(n.id));
        const steps = [];
        const executed = new Set();
        let failed = false;
        const walk = async (node, ancestors) => {
            if (executed.has(node.id)) {
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
        run.status = failed ? workflow_run_schema_1.WorkflowRunStatus.FAILED : workflow_run_schema_1.WorkflowRunStatus.SUCCESS;
        run.finishedAt = new Date();
        const saved = await run.save();
        await this.capRuns(workflowId);
        return saved;
    }
    async capRuns(workflowId) {
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
        }
        catch {
        }
    }
    async clearRuns(workflowId) {
        await this.findOne(workflowId);
        const res = await this.workflowRunModel.deleteMany({ workflowId }).exec();
        return { deleted: res.deletedCount ?? 0 };
    }
    isTriggerNode(node) {
        return String(node.type ?? '').toLowerCase().startsWith('trigger');
    }
    edgeMatchesBranch(edge, branch) {
        const label = String(edge.data?.branch ?? edge.label ?? '').toLowerCase();
        if (!label)
            return true;
        return label === branch;
    }
    async runNode(node, triggerPayload) {
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
        }
        catch (err) {
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
    resolveKind(node) {
        const rawType = String(node.type ?? '').toLowerCase();
        if (rawType.startsWith('trigger'))
            return 'trigger';
        if (rawType.startsWith('condition'))
            return 'condition';
        return 'action';
    }
    isCreateTaskAction(node) {
        const rawType = String(node.type ?? '').toLowerCase();
        const icon = String(node.data?.icon ?? '').toLowerCase();
        return rawType.includes('create_task') || icon === 'task';
    }
    async handleCreateTask(node, triggerPayload, timestamp) {
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
        });
        return {
            step: {
                nodeId: node.id,
                type: 'action.create_task',
                status: 'success',
                output: { taskId: String(task._id), title: task.title },
                timestamp,
            },
        };
    }
    handleCondition(node, triggerPayload, timestamp) {
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
    resolveActionName(node) {
        const rawType = String(node.type ?? '').toLowerCase();
        const withoutPrefix = rawType.startsWith('action.')
            ? rawType.slice('action.'.length)
            : rawType;
        return withoutPrefix;
    }
    async handleSendEmail(node, triggerPayload, timestamp) {
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
            const sent = await this.emailService.send({ to, subject, body });
            return {
                step: {
                    nodeId: node.id,
                    type: 'action.send_email',
                    status: 'success',
                    output: { to, subject, messageId: String(sent?._id ?? '') },
                    timestamp,
                },
            };
        }
        catch (err) {
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
    async handleNotifyTeam(node, timestamp) {
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
                output: { notificationId: String(notification._id) },
                timestamp,
            },
        };
    }
    toNotificationType(value) {
        const raw = String(value ?? '').toLowerCase();
        const match = Object.values(notification_schema_1.NotificationType).find((t) => t === raw);
        return match ?? notification_schema_1.NotificationType.INFO;
    }
    async handleUpdateCrm(node, triggerPayload, timestamp) {
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
        let updated;
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
                output: { entity, id: String(updated?._id ?? id) },
                timestamp,
            },
        };
    }
    handleLog(node, timestamp) {
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
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workflow_schema_1.Workflow.name)),
    __param(1, (0, mongoose_1.InjectModel)(workflow_run_schema_1.WorkflowRun.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        tasks_service_1.TasksService,
        email_service_1.EmailService,
        notifications_service_1.NotificationsService,
        leads_service_1.LeadsService,
        deals_service_1.DealsService])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map