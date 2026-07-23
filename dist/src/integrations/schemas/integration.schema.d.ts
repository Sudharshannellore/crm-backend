import { HydratedDocument } from 'mongoose';
export type IntegrationDocument = HydratedDocument<Integration>;
export declare enum IntegrationCategory {
    COMMUNICATION = "Communication",
    PRODUCTIVITY = "Productivity",
    PAYMENTS = "Payments",
    CRM = "CRM",
    AUTOMATION = "Automation",
    MARKETING = "Marketing",
    VIDEO = "Video",
    SOCIAL = "Social"
}
export declare enum IntegrationStatus {
    AVAILABLE = "available",
    CONNECTED = "connected",
    DISCONNECTED = "disconnected"
}
export declare class Integration {
    name: string;
    description: string;
    category: IntegrationCategory;
    iconKey: string;
    status: IntegrationStatus;
    connectedAt: Date;
    config: Record<string, any>;
}
export declare const IntegrationSchema: import("mongoose").Schema<Integration, import("mongoose").Model<Integration, any, any, any, any, any, Integration>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Integration, import("mongoose").Document<unknown, {}, Integration, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<IntegrationCategory, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    iconKey?: import("mongoose").SchemaDefinitionProperty<string, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<IntegrationStatus, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    connectedAt?: import("mongoose").SchemaDefinitionProperty<Date, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    config?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, Integration, import("mongoose").Document<unknown, {}, Integration, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Integration & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Integration>;
