import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MeetingType } from '../schemas/meeting.schema';

export class CreateMeetingDto {
  @IsString()
  title: string;

  @IsEnum(MeetingType)
  @IsOptional()
  type?: MeetingType;

  date: Date;

  @IsString()
  time: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  agenda?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  reminders?: number;
}
