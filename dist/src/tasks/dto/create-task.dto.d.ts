import { TaskCategory, TaskPriority, TaskStatus } from '../schemas/task.schema';
export declare class CreateTaskDto {
    title: string;
    dueDate?: Date;
    dueTime?: string;
    assignee?: string;
    priority?: TaskPriority;
    category?: TaskCategory;
    relatedTo?: string;
    description?: string;
    status?: TaskStatus;
}
