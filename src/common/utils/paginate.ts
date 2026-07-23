import { QueryFilter, Model } from 'mongoose';
import { PaginatedResult, PaginationQueryDto } from '../dto/pagination-query.dto';

export async function paginate<T>(
  model: Model<T>,
  filter: QueryFilter<T>,
  query: PaginationQueryDto,
): Promise<PaginatedResult<T>> {
  const page = query.page ?? 1;
  const limit = query.limit ?? 20;
  const sortBy = query.sortBy ?? 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

  const [data, total] = await Promise.all([
    model
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec(),
    model.countDocuments(filter).exec(),
  ]);

  return { data, total, page, limit };
}
