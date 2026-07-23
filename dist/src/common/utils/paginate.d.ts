import { QueryFilter, Model } from 'mongoose';
import { PaginatedResult, PaginationQueryDto } from '../dto/pagination-query.dto';
export declare function paginate<T>(model: Model<T>, filter: QueryFilter<T>, query: PaginationQueryDto): Promise<PaginatedResult<T>>;
