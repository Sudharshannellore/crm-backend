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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
const leads_service_1 = require("../leads/leads.service");
const deals_service_1 = require("../deals/deals.service");
const contacts_service_1 = require("../contacts/contacts.service");
const tasks_service_1 = require("../tasks/tasks.service");
const deal_schema_1 = require("../deals/schemas/deal.schema");
const task_schema_1 = require("../tasks/schemas/task.schema");
const WON_STAGES = new Set([deal_schema_1.DealStage.CLOSED_WON, 'won', 'closed-won']);
const LOST_STAGES = new Set([deal_schema_1.DealStage.CLOSED_LOST, 'lost', 'closed-lost']);
const TOOLS = [
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
let AiService = class AiService {
    configService;
    leadsService;
    dealsService;
    contactsService;
    tasksService;
    constructor(configService, leadsService, dealsService, contactsService, tasksService) {
        this.configService = configService;
        this.leadsService = leadsService;
        this.dealsService = dealsService;
        this.contactsService = contactsService;
        this.tasksService = tasksService;
    }
    getClient() {
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            throw new common_1.ServiceUnavailableException('AI features are not configured — set OPENAI_API_KEY');
        }
        const baseURL = this.configService.get('OPENAI_BASE_URL');
        return new openai_1.default(baseURL ? { apiKey, baseURL } : { apiKey });
    }
    getModel() {
        return this.configService.get('OPENAI_MODEL') || 'gpt-4o-mini';
    }
    describePageContext(pageContext) {
        if (!pageContext?.entityType)
            return '';
        const where = pageContext.entityId
            ? `${pageContext.entityType} ${pageContext.entityId}`
            : pageContext.entityType;
        return `\n\nThe user is currently viewing the ${where} page (path: ${pageContext.path ?? 'unknown'}). Prefer this entity when the user says "this deal", "this lead", etc.`;
    }
    async buildCrmSnapshot() {
        const [leads, deals, tasks] = await Promise.all([
            this.leadsService.findAll({ page: 1, limit: 100 }),
            this.dealsService.findAll({ page: 1, limit: 100 }),
            this.tasksService.findAll({ page: 1, limit: 100 }),
        ]);
        const openDeals = deals.data.filter((d) => !WON_STAGES.has(String(d.stage)) && !LOST_STAGES.has(String(d.stage)));
        const pipelineValue = openDeals.reduce((sum, d) => sum + (d.value ?? 0), 0);
        const wonDeals = deals.data.filter((d) => WON_STAGES.has(String(d.stage)));
        const now = Date.now();
        const overdueTasks = tasks.data.filter((t) => t.status !== task_schema_1.TaskStatus.COMPLETED && t.dueDate && new Date(t.dueDate).getTime() < now);
        const staleDeals = openDeals.filter((d) => {
            const updatedAt = d.updatedAt;
            if (!updatedAt)
                return false;
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
    async runTool(name, args) {
        switch (name) {
            case 'find_deal': {
                const query = String(args.query ?? '').toLowerCase();
                const { data } = await this.dealsService.findAll({ page: 1, limit: 100 });
                const matches = data.filter((d) => d.title?.toLowerCase().includes(query) || d.company?.toLowerCase().includes(query));
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
                const matches = data.filter((l) => l.name?.toLowerCase().includes(query) || l.company?.toLowerCase().includes(query));
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
                    .filter((t) => t.status !== task_schema_1.TaskStatus.COMPLETED && t.dueDate && new Date(t.dueDate).getTime() < now)
                    .slice(0, 10)
                    .map((t) => ({ title: t.title, dueDate: t.dueDate, assignee: t.assignee, priority: t.priority }));
            }
            case 'get_pipeline_summary':
                return this.buildCrmSnapshot();
            default:
                return { error: `Unknown tool: ${name}` };
        }
    }
    async getInsights(context, pageContext) {
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
        }
        catch (err) {
            throw new Error(`AI insights generation failed: model did not return valid JSON (${err.message})`);
        }
    }
    async copilotChat(message, history, pageContext) {
        const client = this.getClient();
        const snapshot = await this.buildCrmSnapshot();
        const systemPrompt = `You are the AI Copilot embedded in a CRM platform. You help sales, marketing, and support users understand their leads, contacts, deals, tasks, and campaigns, and give clear, concise, actionable answers. Keep responses focused and practical.

Use the find_deal, find_lead, list_overdue_tasks, and get_pipeline_summary tools when the user asks about specific records or up-to-date figures rather than guessing. Here is a current high-level snapshot of the CRM for quick reference:
${JSON.stringify(snapshot, null, 2)}${this.describePageContext(pageContext)}`;
        const messages = [
            { role: 'system', content: systemPrompt },
            ...(history ?? []).map((h) => ({ role: h.role, content: h.content })),
            { role: 'user', content: message },
        ];
        const model = this.getModel();
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
                if (toolCall.type !== 'function')
                    continue;
                let args = {};
                try {
                    args = JSON.parse(toolCall.function.arguments || '{}');
                }
                catch {
                }
                const result = await this.runTool(toolCall.function.name, args);
                messages.push({
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(result),
                });
            }
        }
        const final = await client.chat.completions.create({ model, messages });
        return { reply: final.choices[0]?.message?.content ?? '' };
    }
    async generateEmail(prompt, tone) {
        const client = this.getClient();
        const systemPrompt = `You are an expert CRM sales copywriter. Write professional, concise sales/CRM emails based on the user's request${tone ? ` in a ${tone} tone` : ''}. You may use template variables like {{contact_name}}, {{company_name}}, {{sender_name}} where appropriate.

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
        }
        catch (err) {
            throw new Error(`AI email generation failed: model did not return valid JSON (${err.message})`);
        }
    }
    async generateWorkflow(prompt) {
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
        }
        catch (err) {
            throw new Error(`AI workflow generation failed: model did not return valid JSON (${err.message})`);
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        leads_service_1.LeadsService,
        deals_service_1.DealsService,
        contacts_service_1.ContactsService,
        tasks_service_1.TasksService])
], AiService);
//# sourceMappingURL=ai.service.js.map