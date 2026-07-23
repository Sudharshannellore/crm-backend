import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Matches, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { MeetingType } from '../schemas/meeting.schema';

export class CreateMeetingDto {
  @IsString()
  title: string;

  @IsEnum(MeetingType)
  @IsOptional()
  type?: MeetingType;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'time must be in HH:mm format' })
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
