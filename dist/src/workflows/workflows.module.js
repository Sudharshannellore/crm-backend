"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const workflow_schema_1 = require("./schemas/workflow.schema");
const workflow_run_schema_1 = require("./schemas/workflow-run.schema");
const workflows_service_1 = require("./workflows.service");
const workflows_controller_1 = require("./workflows.controller");
const tasks_module_1 = require("../tasks/tasks.module");
const email_module_1 = require("../email/email.module");
const notifications_module_1 = require("../notifications/notifications.module");
const leads_module_1 = require("../leads/leads.module");
const deals_module_1 = require("../deals/deals.module");
let WorkflowsModule = class WorkflowsModule {
};
exports.WorkflowsModule = WorkflowsModule;
exports.WorkflowsModule = WorkflowsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: workflow_schema_1.Workflow.name, schema: workflow_schema_1.WorkflowSchema },
                { name: workflow_run_schema_1.WorkflowRun.name, schema: workflow_run_schema_1.WorkflowRunSchema },
            ]),
            tasks_module_1.TasksModule,
            email_module_1.EmailModule,
            notifications_module_1.NotificationsModule,
            leads_module_1.LeadsModule,
            deals_module_1.DealsModule,
        ],
        controllers: [workflows_controller_1.WorkflowsController],
        providers: [workflows_service_1.WorkflowsService],
    })
], WorkflowsModule);
//# sourceMappingURL=workflows.module.js.map