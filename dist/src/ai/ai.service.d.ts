import { ConfigService } from '@nestjs/config';
import { ChatMessageDto, PageContextDto } from './dto/copilot.dto';
import { LeadsService } from '../leads/leads.service';
import { DealsService } from '../deals/deals.service';
import { ContactsService } from '../contacts/contacts.service';
import { TasksService } from '../tasks/tasks.service';
export declare class AiService {
    private readonly configService;
    private readonly leadsService;
    private readonly dealsService;
    private readonly contactsService;
    private readonly tasksService;
    constructor(configService: ConfigService, leadsService: LeadsService, dealsService: DealsService, contactsService: ContactsService, tasksService: TasksService);
    private getClient;
    private getModel;
    private describePageContext;
    private buildCrmSnapshot;
    private runTool;
    getInsights(context?: Record<string, any>, pageContext?: PageContextDto): Promise<any>;
    copilotChat(message: string, history?: ChatMessageDto[], pageContext?: PageContextDto): Promise<{
        reply: string;
    }>;
    generateEmail(prompt: string, tone?: string): Promise<any>;
    generateWorkflow(prompt: string): Promise<any>;
}
