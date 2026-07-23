import { SharedNotesService } from './shared-notes.service';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';
import { UpdateSharedNoteDto } from './dto/update-shared-note.dto';
import { SharedNotesQueryDto } from './dto/shared-notes-query.dto';
export declare class SharedNotesController {
    private readonly sharedNotesService;
    constructor(sharedNotesService: SharedNotesService);
    create(createSharedNoteDto: CreateSharedNoteDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(query: SharedNotesQueryDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./schemas/shared-note.schema").SharedNote>>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, updateSharedNoteDto: UpdateSharedNoteDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/shared-note.schema").SharedNote, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/shared-note.schema").SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
