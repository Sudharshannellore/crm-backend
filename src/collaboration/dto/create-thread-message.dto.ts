import { IsString } from 'class-validator';

export class CreateThreadMessageDto {
  @IsString()
  author: string;

  @IsString()
  text: string;
}
