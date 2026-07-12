import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
