import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TemplateCategory } from '../schemas/template.schema';

export class TemplatesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(TemplateCategory)
  category?: TemplateCategory;
}
