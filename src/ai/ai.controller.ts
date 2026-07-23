import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { InsightsDto } from './dto/insights.dto';
import { CopilotDto } from './dto/copilot.dto';
import { GenerateEmailDto } from './dto/generate-email.dto';
import { GenerateWorkflowDto } from './dto/generate-workflow.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('insights')
  getInsights(@Body() dto: InsightsDto) {
    return this.aiService.getInsights(dto.context);
  }

  @Post('copilot')
  async copilot(@Body() dto: CopilotDto) {
    return this.aiService.copilotChat(dto.message, dto.history);
  }

  @Post('generate-email')
  generateEmail(@Body() dto: GenerateEmailDto) {
    return this.aiService.generateEmail(dto.prompt, dto.tone);
  }

  @Post('generate-workflow')
  generateWorkflow(@Body() dto: GenerateWorkflowDto) {
    return this.aiService.generateWorkflow(dto.prompt);
  }
}
