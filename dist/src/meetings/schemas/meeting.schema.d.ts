import { HydratedDocument } from 'mongoose';
export type MeetingDocument = HydratedDocument<Meeting>;
export declare enum MeetingType {
    VIDEO = "video",
    PHONE = "phone",
    IN_PERSON = "in-person"
}
export declare class Meeting {
    title: string;
    type: MeetingType;
    date: Date;
    time: string;
    duration: number;
    location: string;
    agenda: string;
    reminders: number;
}
export declare const MeetingSchema: import("mongoose").Schema<Meeting, import("mongoose").Model<Meeting, any, any, any, any, any, Meeting>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<MeetingType, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    date?: import("mongoose").SchemaDefinitionProperty<Date, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    time?: import("mongoose").SchemaDefinitionProperty<string, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    duration?: import("mongoose").SchemaDefinitionProperty<number, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    agenda?: import("mongoose").SchemaDefinitionProperty<string, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reminders?: import("mongoose").SchemaDefinitionProperty<number, Meeting, import("mongoose").Document<unknown, {}, Meeting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Meeting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Meeting>;
