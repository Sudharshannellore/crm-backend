import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

export class PageContextDto {
  @IsString()
  @IsOptional()
  entityType?: string;

  @IsString()
  @IsOptional()
  entityId?: string;

  @IsString()
  @IsOptional()
  path?: string;
}

export class CopilotDto {
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  history?: ChatMessageDto[];

  @IsObject()
  @IsOptional()
  pageContext?: PageContextDto;
}
