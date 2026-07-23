import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: TasksQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/task.schema").Task>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
