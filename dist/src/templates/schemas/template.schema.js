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
exports.TemplateSchema = exports.Template = exports.TemplateCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var TemplateCategory;
(function (TemplateCategory) {
    TemplateCategory["SALES"] = "Sales";
    TemplateCategory["COMMUNICATION"] = "Communication";
    TemplateCategory["DEALS"] = "Deals";
    TemplateCategory["ONBOARDING"] = "Onboarding";
    TemplateCategory["FOLLOW_UP"] = "Follow-up";
    TemplateCategory["MARKETING"] = "Marketing";
})(TemplateCategory || (exports.TemplateCategory = TemplateCategory = {}));
let Template = class Template {
    name;
    subject;
    content;
    category;
    tags;
    usageCount;
    lastUsedAt;
};
exports.Template = Template;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Template.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Template.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Template.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: TemplateCategory, default: TemplateCategory.SALES }),
    __metadata("design:type", String)
], Template.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Template.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Template.prototype, "usageCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Template.prototype, "lastUsedAt", void 0);
exports.Template = Template = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Template);
exports.TemplateSchema = mongoose_1.SchemaFactory.createForClass(Template);
//# sourceMappingURL=template.schema.js.map