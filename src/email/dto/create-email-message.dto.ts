import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { EmailMailbox } from '../schemas/email-message.schema';

export class CreateEmailMessageDto {
  @IsEnum(EmailMailbox)
  mailbox: EmailMailbox;

  @IsEmail()
  from: string;

  @IsArray()
  @IsEmail({}, { each: true })
  to: string[];

  @IsArray()
  @IsEmail({}, { each: true })
  @IsOptional()
  cc?: string[];

  @IsArray()
  @IsEmail({}, { each: true })
  @IsOptional()
  bcc?: string[];

  @IsString()
  subject: string;

  @IsString()
  body: string;

  @IsBoolean()
  @IsOptional()
  read?: boolean;

  @IsBoolean()
  @IsOptional()
  starred?: boolean;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  sentAt?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  receivedAt?: Date;

  @IsString()
  @IsOptional()
  relatedEntityType?: string;

  @IsString()
  @IsOptional()
  relatedEntityId?: string;
}
