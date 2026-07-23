import { IsDate, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskCategory, TaskPriority, TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;

  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'dueTime must be in HH:mm format' })
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
