import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { OrganizationType, Industry } from '../schemas/organization.schema';

export class OrganizationsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(OrganizationType)
  type?: OrganizationType;

  @IsOptional()
  @IsEnum(Industry)
  industry?: Industry;
}
