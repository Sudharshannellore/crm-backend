import { IsObject, IsOptional } from 'class-validator';

export class InsightsDto {
  @IsObject()
  @IsOptional()
  context?: Record<string, any>;
}
