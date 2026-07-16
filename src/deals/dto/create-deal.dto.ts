import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DealPriority, DealStage } from '../schemas/deal.schema';

export class CreateDealDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  closeDate?: Date;

  @IsString()
  @IsOptional()
  owner?: string;

  @IsEnum(DealStage)
  @IsOptional()
  stage?: DealStage;

  @IsEnum(DealPriority)
  @IsOptional()
  priority?: DealPriority;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  probability?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
