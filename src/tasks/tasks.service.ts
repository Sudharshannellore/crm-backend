import { InjectModel } from '@nestjs/mongoose';
import { QueryFilter, Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';
import { paginate } from '../common/utils/paginate';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const created = await new this.taskModel(createTaskDto).save();
    if (created.assignee) {
      try {
        await this.notificationsService.create({
          title: 'Task assigned',
          message: `Task "${created.title}" was assigned to ${created.assignee}.`,
          type: NotificationType.INFO,
          relatedEntityType: 'task',
          relatedEntityId: String((created as any)._id),
        });
      } catch {
        // swallow — notifications are non-fatal
      }
    }
    return created;
  }

  findAll(query: TasksQueryDto) {
    const filter: QueryFilter<Task> = {};
    if (query.status !== undefined) {
      filter.status = query.status;
    }
    if (query.priority !== undefined) {
      filter.priority = query.priority;
    }
    return paginate(this.taskModel, filter, query);
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }
}
