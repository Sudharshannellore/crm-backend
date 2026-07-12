import { Document } from 'mongoose';
export declare class Deal extends Document {
    title: string;
    value: number;
    stage: string;
    accountId: string;
}
export declare const DealSchema: import("mongoose").Schema<Deal, import("mongoose").Model<Deal, any, any, any, any, any, Deal>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Deal, Document<unknown, {}, Deal, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Deal & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Deal, Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<number, Deal, Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    accountId?: import("mongoose").SchemaDefinitionProperty<string, Deal, Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Deal, Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    stage?: import("mongoose").SchemaDefinitionProperty<string, Deal, Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Deal>;
