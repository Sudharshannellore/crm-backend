import { IsArray, IsOptional, IsString } from 'class-validator';

export class ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

export class CopilotDto {
  @IsString()
  message: string;

  @IsArray()
  @IsOptional()
  history?: ChatMessageDto[];
}
