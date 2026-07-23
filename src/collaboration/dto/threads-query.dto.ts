import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class ThreadsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  tag?: string;
}
