import { HydratedDocument } from 'mongoose';
export type TemplateDocument = HydratedDocument<Template>;
export declare enum TemplateCategory {
    SALES = "Sales",
    COMMUNICATION = "Communication",
    DEALS = "Deals",
    ONBOARDING = "Onboarding",
    FOLLOW_UP = "Follow-up",
    MARKETING = "Marketing"
}
export declare class Template {
    name: string;
    subject: string;
    content: string;
    category: TemplateCategory;
    tags: string[];
    usageCount: number;
    lastUsedAt: Date;
}
export declare const TemplateSchema: import("mongoose").Schema<Template, import("mongoose").Model<Template, any, any, any, any, any, Template>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Template, import("mongoose").Document<unknown, {}, Template, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string, Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<TemplateCategory, Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    usageCount?: import("mongoose").SchemaDefinitionProperty<number, Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastUsedAt?: import("mongoose").SchemaDefinitionProperty<Date, Template, import("mongoose").Document<unknown, {}, Template, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Template & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Template>;
