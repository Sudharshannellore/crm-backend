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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessageSchema = exports.EmailMessage = exports.EmailMailbox = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var EmailMailbox;
(function (EmailMailbox) {
    EmailMailbox["INBOX"] = "inbox";
    EmailMailbox["SENT"] = "sent";
    EmailMailbox["DRAFTS"] = "drafts";
})(EmailMailbox || (exports.EmailMailbox = EmailMailbox = {}));
let EmailMessage = class EmailMessage {
    mailbox;
    from;
    to;
    cc;
    bcc;
    subject;
    body;
    read;
    starred;
    sentAt;
    receivedAt;
    relatedEntityType;
    relatedEntityId;
};
exports.EmailMessage = EmailMessage;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: EmailMailbox, required: true }),
    __metadata("design:type", String)
], EmailMessage.prototype, "mailbox", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailMessage.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], EmailMessage.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], EmailMessage.prototype, "cc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], EmailMessage.prototype, "bcc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailMessage.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EmailMessage.prototype, "body", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], EmailMessage.prototype, "read", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], EmailMessage.prototype, "starred", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], EmailMessage.prototype, "sentAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], EmailMessage.prototype, "receivedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EmailMessage.prototype, "relatedEntityType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EmailMessage.prototype, "relatedEntityId", void 0);
exports.EmailMessage = EmailMessage = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], EmailMessage);
exports.EmailMessageSchema = mongoose_1.SchemaFactory.createForClass(EmailMessage);
//# sourceMappingURL=email-message.schema.js.map