import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { EmailMailbox } from '../schemas/email-message.schema';
export declare class EmailMessagesQueryDto extends PaginationQueryDto {
    mailbox?: EmailMailbox;
}
