import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WorkflowStatus } from '../schemas/workflow.schema';

class TriggerDto {
  @IsString()
  type: string;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;
}

export class CreateWorkflowDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(WorkflowStatus)
  @IsOptional()
  status?: WorkflowStatus;

  @ValidateNested()
  @Type(() => TriggerDto)
  @IsOptional()
  trigger?: TriggerDto;

  @IsArray()
  @IsOptional()
  nodes?: Record<string, any>[];

  @IsArray()
  @IsOptional()
  edges?: Record<string, any>[];
}
