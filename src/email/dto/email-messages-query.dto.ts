import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EmailMailbox } from '../schemas/email-message.schema';

export class EmailMessagesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(EmailMailbox)
  mailbox?: EmailMailbox;
}
