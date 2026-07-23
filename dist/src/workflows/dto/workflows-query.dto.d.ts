import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { WorkflowStatus } from '../schemas/workflow.schema';
export declare class WorkflowsQueryDto extends PaginationQueryDto {
    status?: WorkflowStatus;
}
