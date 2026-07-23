import { IsString } from 'class-validator';

export class GenerateWorkflowDto {
  @IsString()
  prompt: string;
}
