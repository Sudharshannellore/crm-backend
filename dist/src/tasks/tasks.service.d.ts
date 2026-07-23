import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class TasksService {
    private readonly taskModel;
    private readonly notificationsService;
    constructor(taskModel: Model<Task>, notificationsService: NotificationsService);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: TasksQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Task>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Task, {}, import("mongoose").DefaultSchemaOptions> & Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
