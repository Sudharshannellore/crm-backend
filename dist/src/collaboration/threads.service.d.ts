import { Model } from 'mongoose';
import { Thread, ThreadDocument } from './schemas/thread.schema';
import { SharedNoteDocument } from './schemas/shared-note.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateThreadMessageDto } from './dto/create-thread-message.dto';
import { ThreadsQueryDto } from './dto/threads-query.dto';
export declare class ThreadsService {
    private readonly threadModel;
    private readonly sharedNoteModel;
    constructor(threadModel: Model<ThreadDocument>, sharedNoteModel: Model<SharedNoteDocument>);
    private static readonly MENTION_RE;
    getMentions(limit?: number): Promise<{
        id: string;
        text: string;
        author: string;
        createdAt: Date;
        threadId?: string;
    }[]>;
    create(createThreadDto: CreateThreadDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: ThreadsQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<Thread>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateThreadDto: UpdateThreadDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    addMessage(id: string, createThreadMessageDto: CreateThreadMessageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Thread, {}, import("mongoose").DefaultSchemaOptions> & Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
