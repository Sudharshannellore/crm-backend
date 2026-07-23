import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IntegrationCategory } from '../schemas/integration.schema';

export class IntegrationsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(IntegrationCategory)
  category?: IntegrationCategory;
}
