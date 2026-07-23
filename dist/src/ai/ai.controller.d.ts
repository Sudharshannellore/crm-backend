import { AiService } from './ai.service';
import { InsightsDto } from './dto/insights.dto';
import { CopilotDto } from './dto/copilot.dto';
import { GenerateEmailDto } from './dto/generate-email.dto';
import { GenerateWorkflowDto } from './dto/generate-workflow.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    getInsights(dto: InsightsDto): Promise<any>;
    copilot(dto: CopilotDto): Promise<{
        reply: string;
    }>;
    generateEmail(dto: GenerateEmailDto): Promise<any>;
    generateWorkflow(dto: GenerateWorkflowDto): Promise<any>;
}
