import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workflow, WorkflowSchema } from './schemas/workflow.schema';
import { WorkflowRun, WorkflowRunSchema } from './schemas/workflow-run.schema';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { TasksModule } from '../tasks/tasks.module';
import { EmailModule } from '../email/email.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { LeadsModule } from '../leads/leads.module';
import { DealsModule } from '../deals/deals.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workflow.name, schema: WorkflowSchema },
      { name: WorkflowRun.name, schema: WorkflowRunSchema },
    ]),
    TasksModule,
    EmailModule,
    NotificationsModule,
    LeadsModule,
    DealsModule,
  ],
  controllers: [WorkflowsController],
  providers: [WorkflowsService],
})
export class WorkflowsModule {}
