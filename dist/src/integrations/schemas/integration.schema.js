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
exports.IntegrationSchema = exports.Integration = exports.IntegrationStatus = exports.IntegrationCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var IntegrationCategory;
(function (IntegrationCategory) {
    IntegrationCategory["COMMUNICATION"] = "Communication";
    IntegrationCategory["PRODUCTIVITY"] = "Productivity";
    IntegrationCategory["PAYMENTS"] = "Payments";
    IntegrationCategory["CRM"] = "CRM";
    IntegrationCategory["AUTOMATION"] = "Automation";
    IntegrationCategory["MARKETING"] = "Marketing";
    IntegrationCategory["VIDEO"] = "Video";
    IntegrationCategory["SOCIAL"] = "Social";
})(IntegrationCategory || (exports.IntegrationCategory = IntegrationCategory = {}));
var IntegrationStatus;
(function (IntegrationStatus) {
    IntegrationStatus["AVAILABLE"] = "available";
    IntegrationStatus["CONNECTED"] = "connected";
    IntegrationStatus["DISCONNECTED"] = "disconnected";
})(IntegrationStatus || (exports.IntegrationStatus = IntegrationStatus = {}));
let Integration = class Integration {
    name;
    description;
    category;
    iconKey;
    status;
    connectedAt;
    config;
};
exports.Integration = Integration;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Integration.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Integration.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: IntegrationCategory, required: true }),
    __metadata("design:type", String)
], Integration.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Integration.prototype, "iconKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: IntegrationStatus,
        default: IntegrationStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], Integration.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Integration.prototype, "connectedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Integration.prototype, "config", void 0);
exports.Integration = Integration = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Integration);
exports.IntegrationSchema = mongoose_1.SchemaFactory.createForClass(Integration);
//# sourceMappingURL=integration.schema.js.map