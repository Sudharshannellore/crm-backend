import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/task.schema").Task, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/task.schema").Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
