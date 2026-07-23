import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { WorkflowStatus } from '../schemas/workflow.schema';

export class WorkflowsQueryDto extends PaginationQueryDto {
  @IsEnum(WorkflowStatus)
  @IsOptional()
  status?: WorkflowStatus;
}
