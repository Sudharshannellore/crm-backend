import { HydratedDocument } from 'mongoose';
export type SharedNoteDocument = HydratedDocument<SharedNote>;
export declare class SharedNote {
    title: string;
    content: string;
    author: string;
    tags: string[];
}
export declare const SharedNoteSchema: import("mongoose").Schema<SharedNote, import("mongoose").Model<SharedNote, any, any, any, any, any, SharedNote>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SharedNote, import("mongoose").Document<unknown, {}, SharedNote, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<SharedNote & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, SharedNote, import("mongoose").Document<unknown, {}, SharedNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, SharedNote, import("mongoose").Document<unknown, {}, SharedNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<string, SharedNote, import("mongoose").Document<unknown, {}, SharedNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], SharedNote, import("mongoose").Document<unknown, {}, SharedNote, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SharedNote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, SharedNote>;
