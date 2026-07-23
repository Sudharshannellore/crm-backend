import { HydratedDocument } from 'mongoose';
export type ThreadDocument = HydratedDocument<Thread>;
export declare class ThreadMessage {
    author: string;
    text: string;
    timestamp: Date;
}
export declare const ThreadMessageSchema: import("mongoose").Schema<ThreadMessage, import("mongoose").Model<ThreadMessage, any, any, any, any, any, ThreadMessage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ThreadMessage, import("mongoose").Document<unknown, {}, ThreadMessage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ThreadMessage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    author?: import("mongoose").SchemaDefinitionProperty<string, ThreadMessage, import("mongoose").Document<unknown, {}, ThreadMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ThreadMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    text?: import("mongoose").SchemaDefinitionProperty<string, ThreadMessage, import("mongoose").Document<unknown, {}, ThreadMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ThreadMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    timestamp?: import("mongoose").SchemaDefinitionProperty<Date, ThreadMessage, import("mongoose").Document<unknown, {}, ThreadMessage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ThreadMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ThreadMessage>;
export declare class Thread {
    title: string;
    participants: string[];
    messages: ThreadMessage[];
    tags: string[];
    unread: number;
}
export declare const ThreadSchema: import("mongoose").Schema<Thread, import("mongoose").Model<Thread, any, any, any, any, any, Thread>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Thread, import("mongoose").Document<unknown, {}, Thread, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Thread & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Thread, import("mongoose").Document<unknown, {}, Thread, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    participants?: import("mongoose").SchemaDefinitionProperty<string[], Thread, import("mongoose").Document<unknown, {}, Thread, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    messages?: import("mongoose").SchemaDefinitionProperty<ThreadMessage[], Thread, import("mongoose").Document<unknown, {}, Thread, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], Thread, import("mongoose").Document<unknown, {}, Thread, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    unread?: import("mongoose").SchemaDefinitionProperty<number, Thread, import("mongoose").Document<unknown, {}, Thread, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Thread & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Thread>;
