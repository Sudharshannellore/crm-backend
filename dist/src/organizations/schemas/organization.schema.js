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
exports.OrganizationSchema = exports.Organization = exports.OrganizationType = exports.Industry = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var Industry;
(function (Industry) {
    Industry["TECHNOLOGY"] = "technology";
    Industry["FINANCE"] = "finance";
    Industry["HEALTHCARE"] = "healthcare";
    Industry["MANUFACTURING"] = "manufacturing";
    Industry["RETAIL"] = "retail";
    Industry["OTHER"] = "other";
})(Industry || (exports.Industry = Industry = {}));
var OrganizationType;
(function (OrganizationType) {
    OrganizationType["ENTERPRISE"] = "enterprise";
    OrganizationType["MID_MARKET"] = "mid_market";
    OrganizationType["SMB"] = "smb";
})(OrganizationType || (exports.OrganizationType = OrganizationType = {}));
let Organization = class Organization {
    name;
    website;
    industry;
    type;
    employeeCount;
    annualRevenue;
    billingAddress;
    phone;
    description;
};
exports.Organization = Organization;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Organization.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Industry, default: Industry.TECHNOLOGY }),
    __metadata("design:type", String)
], Organization.prototype, "industry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: OrganizationType, default: OrganizationType.ENTERPRISE }),
    __metadata("design:type", String)
], Organization.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Organization.prototype, "employeeCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Organization.prototype, "annualRevenue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Organization.prototype, "billingAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Organization.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
exports.Organization = Organization = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Organization);
exports.OrganizationSchema = mongoose_1.SchemaFactory.createForClass(Organization);
//# sourceMappingURL=organization.schema.js.map