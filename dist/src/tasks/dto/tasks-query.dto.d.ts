import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { TaskStatus, TaskPriority } from '../schemas/task.schema';
export declare class TasksQueryDto extends PaginationQueryDto {
    status?: TaskStatus;
    priority?: TaskPriority;
}
