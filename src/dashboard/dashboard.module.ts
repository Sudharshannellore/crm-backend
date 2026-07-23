import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from '../leads/schemas/lead.schema';
import { Deal, DealSchema } from '../deals/schemas/deal.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { Meeting, MeetingSchema } from '../meetings/schemas/meeting.schema';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lead.name, schema: LeadSchema },
      { name: Deal.name, schema: DealSchema },
      { name: Task.name, schema: TaskSchema },
      { name: Meeting.name, schema: MeetingSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
