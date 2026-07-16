import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Industry, OrganizationType } from '../schemas/organization.schema';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsEnum(Industry)
  @IsOptional()
  industry?: Industry;

  @IsEnum(OrganizationType)
  @IsOptional()
  type?: OrganizationType;

  @IsNumber()
  @Min(0)
  @IsOptional()
  employeeCount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  annualRevenue?: number;

  @IsString()
  @IsOptional()
  billingAddress?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
