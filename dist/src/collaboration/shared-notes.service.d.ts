import { Model } from 'mongoose';
import { SharedNote, SharedNoteDocument } from './schemas/shared-note.schema';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';
import { UpdateSharedNoteDto } from './dto/update-shared-note.dto';
import { SharedNotesQueryDto } from './dto/shared-notes-query.dto';
export declare class SharedNotesService {
    private readonly sharedNoteModel;
    constructor(sharedNoteModel: Model<SharedNoteDocument>);
    create(createSharedNoteDto: CreateSharedNoteDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: SharedNotesQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<SharedNote>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateSharedNoteDto: UpdateSharedNoteDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, SharedNote, {}, import("mongoose").DefaultSchemaOptions> & SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
