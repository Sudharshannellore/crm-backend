import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDealDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsString()
  stage: string;

  @IsString()
  @IsOptional()
  accountId?: string;

  @IsString()
  @IsOptional()
  contactId?: string;

  @IsString()
  @IsOptional()
  expectedCloseDate?: string;
}
