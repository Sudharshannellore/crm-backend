import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ContactType } from '../schemas/contact.schema';
export declare class ContactsQueryDto extends PaginationQueryDto {
    type?: ContactType;
}
