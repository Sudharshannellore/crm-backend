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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const insights_dto_1 = require("./dto/insights.dto");
const copilot_dto_1 = require("./dto/copilot.dto");
const generate_email_dto_1 = require("./dto/generate-email.dto");
const generate_workflow_dto_1 = require("./dto/generate-workflow.dto");
let AiController = class AiController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    getInsights(dto) {
        return this.aiService.getInsights(dto.context, dto.pageContext);
    }
    async copilot(dto) {
        return this.aiService.copilotChat(dto.message, dto.history, dto.pageContext);
    }
    generateEmail(dto) {
        return this.aiService.generateEmail(dto.prompt, dto.tone);
    }
    generateWorkflow(dto) {
        return this.aiService.generateWorkflow(dto.prompt);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('insights'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [insights_dto_1.InsightsDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getInsights", null);
__decorate([
    (0, common_1.Post)('copilot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [copilot_dto_1.CopilotDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "copilot", null);
__decorate([
    (0, common_1.Post)('generate-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_email_dto_1.GenerateEmailDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "generateEmail", null);
__decorate([
    (0, common_1.Post)('generate-workflow'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_workflow_dto_1.GenerateWorkflowDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "generateWorkflow", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map