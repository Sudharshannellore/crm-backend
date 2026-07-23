import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TemplateCategory } from '../schemas/template.schema';
export declare class TemplatesQueryDto extends PaginationQueryDto {
    category?: TemplateCategory;
}
