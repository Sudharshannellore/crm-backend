import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  participants?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
