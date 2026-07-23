import { ConfigService } from '@nestjs/config';
import { ChatMessageDto } from './dto/copilot.dto';
export declare class AiService {
    private readonly configService;
    constructor(configService: ConfigService);
    private getClient;
    private getModel;
    getInsights(context?: Record<string, any>): Promise<any>;
    copilotChat(message: string, history?: ChatMessageDto[]): Promise<{
        reply: string;
    }>;
    generateEmail(prompt: string, tone?: string): Promise<any>;
    generateWorkflow(prompt: string): Promise<any>;
}
