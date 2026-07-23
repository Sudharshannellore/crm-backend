import { IsOptional, IsString } from 'class-validator';

export class GenerateEmailDto {
  @IsString()
  prompt: string;

  @IsString()
  @IsOptional()
  tone?: string;
}
