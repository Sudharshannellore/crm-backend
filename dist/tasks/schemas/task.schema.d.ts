import { Document } from 'mongoose';
export declare class Task extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    assignedTo: string;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, any, any, Task>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, Task, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Task, Document<unknown, {}, Task, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Task, Document<unknown, {}, Task, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Task, Document<unknown, {}, Task, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Task, Document<unknown, {}, Task, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dueDate?: import("mongoose").SchemaDefinitionProperty<Date, Task, Document<unknown, {}, Task, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    assignedTo?: import("mongoose").SchemaDefinitionProperty<string, Task, Document<unknown, {}, Task, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Task & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Task>;
