import {
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IntegrationCategory,
  IntegrationStatus,
} from '../schemas/integration.schema';

export class CreateIntegrationDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(IntegrationCategory)
  category: IntegrationCategory;

  @IsString()
  @IsOptional()
  iconKey?: string;

  @IsEnum(IntegrationStatus)
  @IsOptional()
  status?: IntegrationStatus;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  connectedAt?: Date;

  @IsObject()
  @IsOptional()
  config?: Record<string, any>;
}
