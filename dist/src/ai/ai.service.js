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
let AiService = class AiService {
    configService;
    constructor(configService) {
        this.configService = configService;
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
    async getInsights(context) {
        const client = this.getClient();
        const systemPrompt = `You are an AI analyst embedded in a CRM platform. You analyze pipeline, deal, and account data and produce structured, actionable insights and predictions for a sales team.

Always respond with a single JSON object with exactly this shape, and nothing else:
{
  "insights": [ { "title": string, "description": string, "severity": "low" | "medium" | "high" | "critical" } ],
  "predictions": [ { "label": string, "value": string, "confidence": number } ]
}

"confidence" is a number between 0 and 100. Generate 3-5 insights and 2-4 predictions that are realistic and specific, grounded in the provided context if any is given.`;
        const userPrompt = context
            ? `Here is the current CRM context/summary stats to base your analysis on:\n${JSON.stringify(context, null, 2)}`
            : 'No specific context was provided. Generate plausible, generic but useful CRM insights and predictions for a B2B sales pipeline.';
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
    async copilotChat(message, history) {
        const client = this.getClient();
        const systemPrompt = 'You are the AI Copilot embedded in a CRM platform. You help sales, marketing, and support users understand their leads, contacts, deals, tasks, and campaigns, and give clear, concise, actionable answers. Keep responses focused and practical.';
        const messages = [
            { role: 'system', content: systemPrompt },
            ...(history ?? []).map((h) => ({ role: h.role, content: h.content })),
            { role: 'user', content: message },
        ];
        const completion = await client.chat.completions.create({
            model: this.getModel(),
            messages,
        });
        const reply = completion.choices[0]?.message?.content ?? '';
        return { reply };
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
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map