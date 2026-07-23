import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateThreadMessageDto } from './dto/create-thread-message.dto';
import { ThreadsQueryDto } from './dto/threads-query.dto';
export declare class ThreadsController {
    private readonly threadsService;
    constructor(threadsService: ThreadsService);
    create(createThreadDto: CreateThreadDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: ThreadsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/thread.schema").Thread>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateThreadDto: UpdateThreadDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    addMessage(id: string, createThreadMessageDto: CreateThreadMessageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/thread.schema").Thread, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/thread.schema").Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
