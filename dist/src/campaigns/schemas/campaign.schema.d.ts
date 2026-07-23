import { HydratedDocument } from 'mongoose';
export type CampaignDocument = HydratedDocument<Campaign>;
export declare enum CampaignType {
    EMAIL = "email",
    SOCIAL = "social",
    WEBINAR = "webinar",
    ADS = "ads",
    EVENT = "event"
}
export declare enum CampaignStatus {
    DRAFT = "draft",
    SCHEDULED = "scheduled",
    ACTIVE = "active"
}
export declare class Campaign {
    name: string;
    type: CampaignType;
    status: CampaignStatus;
    startDate: Date;
    endDate: Date;
    budget: number;
    targetAudience: string;
    goal: string;
    description: string;
}
export declare const CampaignSchema: import("mongoose").Schema<Campaign, import("mongoose").Model<Campaign, any, any, any, any, any, Campaign>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<CampaignType, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<CampaignStatus, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    budget?: import("mongoose").SchemaDefinitionProperty<number, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    targetAudience?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    goal?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Campaign, import("mongoose").Document<unknown, {}, Campaign, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Campaign & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Campaign>;
