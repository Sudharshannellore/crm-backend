import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { DealStage, DealPriority } from '../schemas/deal.schema';
export declare class DealsQueryDto extends PaginationQueryDto {
    stage?: DealStage;
    priority?: DealPriority;
}
