import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatMessageDto, PageContextDto } from './dto/copilot.dto';
import { LeadsService } from '../leads/leads.service';
import { DealsService } from '../deals/deals.service';
import { ContactsService } from '../contacts/contacts.service';
import { TasksService } from '../tasks/tasks.service';
import { DealStage } from '../deals/schemas/deal.schema';
import { TaskStatus } from '../tasks/schemas/task.schema';

const WON_STAGES = new Set<string>([DealStage.CLOSED_WON, 'won', 'closed-won']);
const LOST_STAGES = new Set<string>([DealStage.CLOSED_LOST, 'lost', 'closed-lost']);

const TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'find_deal',
      description: 'Search open and closed deals by title or company name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Deal title or company name to search for' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'find_lead',
      description: 'Search leads by name or company name.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Lead name or company name to search for' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_overdue_tasks',
      description: 'List tasks that are past their due date and not completed.',
      parameters: { type: 'object', properties: {} },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_pipeline_summary',
      description: 'Get a summary snapshot of the current CRM pipeline (leads, deals, tasks).',
      parameters: { type: 'object', properties: {} },
    },
  },
];

@Injectable()
export class AiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly leadsService: LeadsService,
    private readonly dealsService: DealsService,
    private readonly contactsService: ContactsService,
    private readonly tasksService: TasksService,
  ) {}

  /**
   * Lazily builds the OpenAI client on each call so that the app can start
   * up (and this module can be loaded) even when OPENAI_API_KEY is not set.
   * Only when an AI endpoint is actually invoked without a key configured do
   * we throw a clear, actionable error instead of crashing.
   */
  private getClient(): OpenAI {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new ServiceUnavailableException(
        'AI features are not configured — set OPENAI_API_KEY',
      );
    }
    const baseURL = this.configService.get<string>('OPENAI_BASE_URL');
    return new OpenAI(baseURL ? { apiKey, baseURL } : { apiKey });
  }

  private getModel(): string {
    return this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini';
  }

  private describePageContext(pageContext?: PageContextDto): string {
    if (!pageContext?.entityType) return '';
    const where = pageContext.entityId
      ? `${pageContext.entityType} ${pageContext.entityId}`
      : pageContext.entityType;
    return `\n\nThe user is currently viewing the ${where} page (path: ${pageContext.path ?? 'unknown'}). Prefer this entity when the user says "this deal", "this lead", etc.`;
  }

  /** Lightweight, real aggregate snapshot of the CRM pulled from Mongo — used to ground insights/chat in real numbers. */
  private async buildCrmSnapshot() {
    const [leads, deals, tasks] = await Promise.all([
      this.leadsService.findAll({ page: 1, limit: 100 }),
      this.dealsService.findAll({ page: 1, limit: 100 }),
      this.tasksService.findAll({ page: 1, limit: 100 }),
    ]);

    const openDeals = deals.data.filter(
      (d) => !WON_STAGES.has(String(d.stage)) && !LOST_STAGES.has(String(d.stage)),
    );
    const pipelineValue = openDeals.reduce((sum, d) => sum + (d.value ?? 0), 0);
    const wonDeals = deals.data.filter((d) => WON_STAGES.has(String(d.stage)));
    const now = Date.now();
    const overdueTasks = tasks.data.filter(
      (t) => t.status !== TaskStatus.COMPLETED && t.dueDate && new Date(t.dueDate).getTime() < now,
    );
    const staleDeals = openDeals.filter((d) => {
      const updatedAt = (d as any).updatedAt;
      if (!updatedAt) return false;
      const days = (now - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24);
      return days > 14;
    });

    return {
      totalLeads: leads.total,
      totalDeals: deals.total,
      openDealsCount: openDeals.length,
      openPipelineValue: pipelineValue,
      wonDealsCount: wonDeals.length,
      overdueTasksCount: overdueTasks.length,
      staleDealsCount: staleDeals.length,
      staleDeals: staleDeals.slice(0, 5).map((d) => ({ title: d.title, company: d.company })),
    };
  }

  private async runTool(name: string, args: Record<string, any>): Promise<unknown> {
    switch (name) {
      case 'find_deal': {
        const query = String(args.query ?? '').toLowerCase();
        const { data } = await this.dealsService.findAll({ page: 1, limit: 100 });
        const matches = data.filter(
          (d) => d.title?.toLowerCase().includes(query) || d.company?.toLowerCase().includes(query),
        );
        return matches
          .slice(0, 5)
          .map((d) => ({
            title: d.title,
            company: d.company,
            stage: d.stage,
            value: d.value,
            priority: d.priority,
            closeDate: d.closeDate,
          }));
      }
      case 'find_lead': {
        const query = String(args.query ?? '').toLowerCase();
        const { data } = await this.leadsService.findAll({ page: 1, limit: 100 });
        const matches = data.filter(
          (l) => l.name?.toLowerCase().includes(query) || l.company?.toLowerCase().includes(query),
        );
        return matches
          .slice(0, 5)
          .map((l) => ({
            name: l.name,
            company: l.company,
            status: l.status,
            source: l.source,
            score: l.score,
            value: l.value,
          }));
      }
      case 'list_overdue_tasks': {
        const { data } = await this.tasksService.findAll({ page: 1, limit: 100 });
        const now = Date.now();
        return data
          .filter((t) => t.status !== TaskStatus.COMPLETED && t.dueDate && new Date(t.dueDate).getTime() < now)
          .slice(0, 10)
          .map((t) => ({ title: t.title, dueDate: t.dueDate, assignee: t.assignee, priority: t.priority }));
      }
      case 'get_pipeline_summary':
        return this.buildCrmSnapshot();
      default:
        return { error: `Unknown tool: ${name}` };
    }
  }

  async getInsights(context?: Record<string, any>, pageContext?: PageContextDto) {
    const client = this.getClient();

    const snapshot = context ?? (await this.buildCrmSnapshot());

    const systemPrompt = `You are an AI analyst embedded in a CRM platform. You analyze pipeline, deal, and account data and produce structured, actionable insights and predictions for a sales team.

Always respond with a single JSON object with exactly this shape, and nothing else:
{
  "insights": [ { "title": string, "description": string, "severity": "low" | "medium" | "high" | "critical" } ],
  "predictions": [ { "label": string, "value": string, "confidence": number } ]
}

"confidence" is a number between 0 and 100. Generate 3-5 insights and 2-4 predictions that are realistic and specific, grounded in the provided CRM data.${this.describePageContext(pageContext)}`;

    const userPrompt = `Here is the current CRM data to base your analysis on:\n${JSON.stringify(snapshot, null, 2)}`;

    const completion = await client.chat.completions.create({
      model: this.getModel(),
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(
        `AI insights generation failed: model did not return valid JSON (${(err as Error).message})`,
      );
    }
  }

  async copilotChat(message: string, history?: ChatMessageDto[], pageContext?: PageContextDto) {
    const client = this.getClient();
    const snapshot = await this.buildCrmSnapshot();

    const systemPrompt = `You are the AI Copilot embedded in a CRM platform. You help sales, marketing, and support users understand their leads, contacts, deals, tasks, and campaigns, and give clear, concise, actionable answers. Keep responses focused and practical.

Use the find_deal, find_lead, list_overdue_tasks, and get_pipeline_summary tools when the user asks about specific records or up-to-date figures rather than guessing. Here is a current high-level snapshot of the CRM for quick reference:
${JSON.stringify(snapshot, null, 2)}${this.describePageContext(pageContext)}`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...(history ?? []).map((h) => ({ role: h.role, content: h.content }) as OpenAI.Chat.Completions.ChatCompletionMessageParam),
      { role: 'user', content: message },
    ];

    const model = this.getModel();

    // Allow up to 2 tool-call round trips before forcing a final answer.
    for (let round = 0; round < 2; round++) {
      const completion = await client.chat.completions.create({
        model,
        messages,
        tools: TOOLS,
      });

      const choice = completion.choices[0];
      const toolCalls = choice?.message?.tool_calls;

      if (!toolCalls || toolCalls.length === 0) {
        return { reply: choice?.message?.content ?? '' };
      }

      messages.push(choice.message);
      for (const toolCall of toolCalls) {
        if (toolCall.type !== 'function') continue;
        let args: Record<string, any> = {};
        try {
          args = JSON.parse(toolCall.function.arguments || '{}');
        } catch {
          // ignore malformed args, run with empty args
        }
        const result = await this.runTool(toolCall.function.name, args);
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }
    }

    // Final call without tools to force a plain-text answer from what's been gathered.
    const final = await client.chat.completions.create({ model, messages });
    return { reply: final.choices[0]?.message?.content ?? '' };
  }

  async generateEmail(prompt: string, tone?: string) {
    const client = this.getClient();

    const systemPrompt = `You are an expert CRM sales copywriter. Write professional, concise sales/CRM emails based on the user's request${
      tone ? ` in a ${tone} tone` : ''
    }. You may use template variables like {{contact_name}}, {{company_name}}, {{sender_name}} where appropriate.

Always respond with a single JSON object with exactly this shape, and nothing else:
{ "subject": string, "body": string }`;

    const completion = await client.chat.completions.create({
      model: this.getModel(),
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(
        `AI email generation failed: model did not return valid JSON (${(err as Error).message})`,
      );
    }
  }

  async generateWorkflow(prompt: string) {
    const client = this.getClient();

    const systemPrompt = `You are an AI automation designer for a CRM's workflow builder. Given a plain-English description of an automation, generate a workflow graph in the XYFlow shape used by the frontend/execution engine.

Respond with a single JSON object with exactly this shape, and nothing else:
{
  "nodes": [ { "id": string, "type": string, "position": { "x": number, "y": number }, "data": object } ],
  "edges": [ { "id": string, "source": string, "target": string } ]
}

Rules:
- The workflow execution engine only understands and can run these node "type" values: "trigger.new_lead", "trigger.form_submitted", "trigger.scheduled", "action.create_task", "action.send_email", "action.notify_team", "action.update_crm", "action.log", and "condition.*" (e.g. "condition.if_else", "condition.wait", or any condition.<name> you need to express a branch/rule check).
- Every node MUST use one of these types (or a condition.* type) so it is actually executable — do not invent unrelated type strings.
- Put a short human-readable label and any relevant description/config in "data" (e.g. { "label": "Send Follow-up Email", "description": "..." }).
- Lay nodes out left-to-right or top-to-bottom with reasonable "position" x/y spacing (e.g. 200px apart) so the graph renders without overlap.
- Start with exactly one trigger node, then conditions/actions as needed. Every non-trigger node should be reachable via edges from the trigger.
- Keep the workflow focused: typically 3-7 nodes total.`;

    const completion = await client.chat.completions.create({
      model: this.getModel(),
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(
        `AI workflow generation failed: model did not return valid JSON (${(err as Error).message})`,
      );
    }
  }
}
