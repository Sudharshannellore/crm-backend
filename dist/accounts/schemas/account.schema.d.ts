import { Document } from 'mongoose';
export declare class Account extends Document {
    name: string;
    industry: string;
    website: string;
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, any, any, Account>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, Document<unknown, {}, Account, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Account & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Account, Document<unknown, {}, Account, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Account, Document<unknown, {}, Account, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    industry?: import("mongoose").SchemaDefinitionProperty<string, Account, Document<unknown, {}, Account, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    website?: import("mongoose").SchemaDefinitionProperty<string, Account, Document<unknown, {}, Account, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Account & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Account>;
