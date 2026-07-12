import { IsString, IsEmail, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsString()
  @IsOptional()
  territory?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
