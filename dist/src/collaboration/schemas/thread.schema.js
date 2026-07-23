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
exports.ThreadSchema = exports.Thread = exports.ThreadMessageSchema = exports.ThreadMessage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ThreadMessage = class ThreadMessage {
    author;
    text;
    timestamp;
};
exports.ThreadMessage = ThreadMessage;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ThreadMessage.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ThreadMessage.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], ThreadMessage.prototype, "timestamp", void 0);
exports.ThreadMessage = ThreadMessage = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ThreadMessage);
exports.ThreadMessageSchema = mongoose_1.SchemaFactory.createForClass(ThreadMessage);
let Thread = class Thread {
    title;
    participants;
    messages;
    tags;
    unread;
};
exports.Thread = Thread;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Thread.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Thread.prototype, "participants", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.ThreadMessageSchema], default: [] }),
    __metadata("design:type", Array)
], Thread.prototype, "messages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Thread.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Thread.prototype, "unread", void 0);
exports.Thread = Thread = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Thread);
exports.ThreadSchema = mongoose_1.SchemaFactory.createForClass(Thread);
//# sourceMappingURL=thread.schema.js.map