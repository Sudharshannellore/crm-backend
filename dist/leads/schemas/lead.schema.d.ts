import { HydratedDocument } from 'mongoose';
export type LeadDocument = HydratedDocument<Lead>;
export declare class Lead {
    name: string;
    company: string;
    email: string;
    phone: string;
    score: number;
    status: string;
    source: string;
    value: number;
    lastContact: Date;
    territory: string;
    notes: string;
}
export declare const LeadSchema: import("mongoose").Schema<Lead, import("mongoose").Model<Lead, any, any, any, any, any, Lead>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, import("mongoose").Document<unknown, {}, Lead, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    score?: import("mongoose").SchemaDefinitionProperty<number, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<number, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastContact?: import("mongoose").SchemaDefinitionProperty<Date, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    territory?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Lead, import("mongoose").Document<unknown, {}, Lead, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Lead & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Lead>;
