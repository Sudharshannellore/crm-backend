import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskCategory, TaskPriority, TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  dueDate?: Date;

  @IsString()
  @IsOptional()
  dueTime?: string;

  @IsString()
  @IsOptional()
  assignee?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskCategory)
  @IsOptional()
  category?: TaskCategory;

  @IsString()
  @IsOptional()
  relatedTo?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
