import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CampaignStatus, CampaignType } from '../schemas/campaign.schema';

export class CreateCampaignDto {
  @IsString()
  name: string;

  @IsEnum(CampaignType)
  @IsOptional()
  type?: CampaignType;

  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @Min(0)
  @IsOptional()
  budget?: number;

  @IsString()
  @IsOptional()
  targetAudience?: string;

  @IsString()
  @IsOptional()
  goal?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
