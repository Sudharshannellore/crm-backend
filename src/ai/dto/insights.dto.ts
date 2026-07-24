import { IsObject, IsOptional } from 'class-validator';
import { PageContextDto } from './copilot.dto';

export class InsightsDto {
  @IsObject()
  @IsOptional()
  context?: Record<string, any>;

  @IsObject()
  @IsOptional()
  pageContext?: PageContextDto;
}
