import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ContactType } from '../schemas/contact.schema';

export class ContactsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(ContactType)
  type?: ContactType;
}
