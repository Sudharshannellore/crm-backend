import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { OrganizationType, Industry } from '../schemas/organization.schema';
export declare class OrganizationsQueryDto extends PaginationQueryDto {
    type?: OrganizationType;
    industry?: Industry;
}
