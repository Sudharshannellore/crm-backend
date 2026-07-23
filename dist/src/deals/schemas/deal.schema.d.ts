import { HydratedDocument } from 'mongoose';
export type DealDocument = HydratedDocument<Deal>;
export declare enum DealStage {
    DISCOVERY = "discovery",
    QUALIFICATION = "qualification",
    PROPOSAL = "proposal",
    NEGOTIATION = "negotiation",
    CLOSED_WON = "closed_won",
    CLOSED_LOST = "closed_lost"
}
export declare enum DealPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Deal {
    title: string;
    company: string;
    value: number;
    closeDate: Date;
    owner: string;
    stage: DealStage;
    priority: DealPriority;
    probability: number;
    description: string;
}
export declare const DealSchema: import("mongoose").Schema<Deal, import("mongoose").Model<Deal, any, any, any, any, any, Deal>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Deal, import("mongoose").Document<unknown, {}, Deal, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    value?: import("mongoose").SchemaDefinitionProperty<number, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    closeDate?: import("mongoose").SchemaDefinitionProperty<Date, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    owner?: import("mongoose").SchemaDefinitionProperty<string, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    stage?: import("mongoose").SchemaDefinitionProperty<DealStage, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    priority?: import("mongoose").SchemaDefinitionProperty<DealPriority, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    probability?: import("mongoose").SchemaDefinitionProperty<number, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Deal, import("mongoose").Document<unknown, {}, Deal, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Deal & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Deal>;
