import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IntegrationCategory } from '../schemas/integration.schema';
export declare class IntegrationsQueryDto extends PaginationQueryDto {
    category?: IntegrationCategory;
}
