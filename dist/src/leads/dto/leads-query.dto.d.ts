import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { LeadStatus, LeadSource } from '../schemas/lead.schema';
export declare class LeadsQueryDto extends PaginationQueryDto {
    status?: LeadStatus;
    source?: LeadSource;
}
