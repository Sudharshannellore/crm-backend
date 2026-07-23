"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const leads_module_1 = require("./leads/leads.module");
const organizations_module_1 = require("./organizations/organizations.module");
const contacts_module_1 = require("./contacts/contacts.module");
const deals_module_1 = require("./deals/deals.module");
const tasks_module_1 = require("./tasks/tasks.module");
const meetings_module_1 = require("./meetings/meetings.module");
const campaigns_module_1 = require("./campaigns/campaigns.module");
const logging_middleware_1 = require("./common/middleware/logging.middleware");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const analytics_module_1 = require("./analytics/analytics.module");
const notifications_module_1 = require("./notifications/notifications.module");
const collaboration_module_1 = require("./collaboration/collaboration.module");
const templates_module_1 = require("./templates/templates.module");
const integrations_module_1 = require("./integrations/integrations.module");
const email_module_1 = require("./email/email.module");
const workflows_module_1 = require("./workflows/workflows.module");
const ai_module_1 = require("./ai/ai.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logging_middleware_1.LoggingMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 120,
                },
            ]),
            leads_module_1.LeadsModule,
            organizations_module_1.OrganizationsModule,
            contacts_module_1.ContactsModule,
            deals_module_1.DealsModule,
            tasks_module_1.TasksModule,
            meetings_module_1.MeetingsModule,
            campaigns_module_1.CampaignsModule,
            dashboard_module_1.DashboardModule,
            analytics_module_1.AnalyticsModule,
            notifications_module_1.NotificationsModule,
            collaboration_module_1.CollaborationModule,
            templates_module_1.TemplatesModule,
            integrations_module_1.IntegrationsModule,
            email_module_1.EmailModule,
            workflows_module_1.WorkflowsModule,
            ai_module_1.AiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map