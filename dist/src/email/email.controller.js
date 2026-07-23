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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const create_email_message_dto_1 = require("./dto/create-email-message.dto");
const email_messages_query_dto_1 = require("./dto/email-messages-query.dto");
const send_email_dto_1 = require("./dto/send-email.dto");
const update_email_message_dto_1 = require("./dto/update-email-message.dto");
const email_service_1 = require("./email.service");
let EmailController = class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    send(sendEmailDto) {
        return this.emailService.send(sendEmailDto);
    }
    create(createEmailMessageDto) {
        return this.emailService.create(createEmailMessageDto);
    }
    findAll(query) {
        return this.emailService.findAll(query);
    }
    findOne(id) {
        return this.emailService.findOne(id);
    }
    update(id, updateEmailMessageDto) {
        return this.emailService.update(id, updateEmailMessageDto);
    }
    remove(id) {
        return this.emailService.remove(id);
    }
    markRead(id, read) {
        return this.emailService.setRead(id, read ?? true);
    }
    toggleStar(id) {
        return this.emailService.toggleStar(id);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "send", null);
__decorate([
    (0, common_1.Post)('messages'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_message_dto_1.CreateEmailMessageDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_messages_query_dto_1.EmailMessagesQueryDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('messages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('messages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_email_message_dto_1.UpdateEmailMessageDto]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('messages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('messages/:id/read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('read')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "markRead", null);
__decorate([
    (0, common_1.Patch)('messages/:id/star'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "toggleStar", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map