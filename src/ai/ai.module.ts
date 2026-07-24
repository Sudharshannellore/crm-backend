import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { LeadsModule } from '../leads/leads.module';
import { DealsModule } from '../deals/deals.module';
import { ContactsModule } from '../contacts/contacts.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [LeadsModule, DealsModule, ContactsModule, TasksModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
