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
exports.DealSchema = exports.Deal = exports.DealPriority = exports.DealStage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var DealStage;
(function (DealStage) {
    DealStage["DISCOVERY"] = "discovery";
    DealStage["QUALIFICATION"] = "qualification";
    DealStage["PROPOSAL"] = "proposal";
    DealStage["NEGOTIATION"] = "negotiation";
    DealStage["CLOSED_WON"] = "closed_won";
    DealStage["CLOSED_LOST"] = "closed_lost";
})(DealStage || (exports.DealStage = DealStage = {}));
var DealPriority;
(function (DealPriority) {
    DealPriority["LOW"] = "low";
    DealPriority["MEDIUM"] = "medium";
    DealPriority["HIGH"] = "high";
})(DealPriority || (exports.DealPriority = DealPriority = {}));
let Deal = class Deal {
    title;
    company;
    value;
    closeDate;
    owner;
    stage;
    priority;
    probability;
    description;
};
exports.Deal = Deal;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Deal.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Deal.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 0 }),
    __metadata("design:type", Number)
], Deal.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Deal.prototype, "closeDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Deal.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: DealStage, default: DealStage.DISCOVERY }),
    __metadata("design:type", String)
], Deal.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: DealPriority, default: DealPriority.MEDIUM }),
    __metadata("design:type", String)
], Deal.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 20, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Deal.prototype, "probability", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Deal.prototype, "description", void 0);
exports.Deal = Deal = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Deal);
exports.DealSchema = mongoose_1.SchemaFactory.createForClass(Deal);
//# sourceMappingURL=deal.schema.js.map