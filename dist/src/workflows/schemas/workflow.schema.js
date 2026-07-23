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
exports.WorkflowSchema = exports.Workflow = exports.WorkflowStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["DRAFT"] = "draft";
    WorkflowStatus["ACTIVE"] = "active";
    WorkflowStatus["PAUSED"] = "paused";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
let Workflow = class Workflow {
    name;
    description;
    status;
    trigger;
    nodes;
    edges;
};
exports.Workflow = Workflow;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Workflow.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Workflow.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: WorkflowStatus, default: WorkflowStatus.DRAFT }),
    __metadata("design:type", String)
], Workflow.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], Workflow.prototype, "trigger", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], Workflow.prototype, "nodes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], Workflow.prototype, "edges", void 0);
exports.Workflow = Workflow = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Workflow);
exports.WorkflowSchema = mongoose_1.SchemaFactory.createForClass(Workflow);
//# sourceMappingURL=workflow.schema.js.map