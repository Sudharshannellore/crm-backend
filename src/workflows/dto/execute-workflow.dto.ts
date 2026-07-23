import { IsObject, IsOptional } from 'class-validator';

export class ExecuteWorkflowDto {
  @IsObject()
  @IsOptional()
  triggerPayload?: Record<string, any>;
}
