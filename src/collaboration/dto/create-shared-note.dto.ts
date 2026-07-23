import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateSharedNoteDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  author: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
