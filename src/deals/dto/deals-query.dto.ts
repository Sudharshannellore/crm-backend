import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { DealStage, DealPriority } from '../schemas/deal.schema';

export class DealsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(DealStage)
  stage?: DealStage;

  @IsOptional()
  @IsEnum(DealPriority)
  priority?: DealPriority;
}
