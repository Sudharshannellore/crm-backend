import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailMessageDto } from './create-email-message.dto';

export class UpdateEmailMessageDto extends PartialType(CreateEmailMessageDto) {}
