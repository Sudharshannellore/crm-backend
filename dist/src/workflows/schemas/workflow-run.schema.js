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
exports.WorkflowRunSchema = exports.WorkflowRun = exports.WorkflowRunStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var WorkflowRunStatus;
(function (WorkflowRunStatus) {
    WorkflowRunStatus["RUNNING"] = "running";
    WorkflowRunStatus["SUCCESS"] = "success";
    WorkflowRunStatus["FAILED"] = "failed";
})(WorkflowRunStatus || (exports.WorkflowRunStatus = WorkflowRunStatus = {}));
let WorkflowRun = class WorkflowRun {
    workflowId;
    startedAt;
    finishedAt;
    status;
    steps;
    triggerPayload;
};
exports.WorkflowRun = WorkflowRun;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], WorkflowRun.prototype, "workflowId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: () => new Date() }),
    __metadata("design:type", Date)
], WorkflowRun.prototype, "startedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], WorkflowRun.prototype, "finishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: WorkflowRunStatus, default: WorkflowRunStatus.RUNNING }),
    __metadata("design:type", String)
], WorkflowRun.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object], default: [] }),
    __metadata("design:type", Array)
], WorkflowRun.prototype, "steps", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], WorkflowRun.prototype, "triggerPayload", void 0);
exports.WorkflowRun = WorkflowRun = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], WorkflowRun);
exports.WorkflowRunSchema = mongoose_1.SchemaFactory.createForClass(WorkflowRun);
//# sourceMappingURL=workflow-run.schema.js.map