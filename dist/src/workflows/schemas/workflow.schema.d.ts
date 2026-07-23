import { HydratedDocument } from 'mongoose';
export type WorkflowDocument = HydratedDocument<Workflow>;
export declare enum WorkflowStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    PAUSED = "paused"
}
export interface WorkflowTrigger {
    type: string;
    config?: Record<string, any>;
}
export interface WorkflowNode {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: Record<string, any>;
}
export interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
    [key: string]: any;
}
export declare class Workflow {
    name: string;
    description: string;
    status: WorkflowStatus;
    trigger: WorkflowTrigger;
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
}
export declare const WorkflowSchema: import("mongoose").Schema<Workflow, import("mongoose").Model<Workflow, any, any, any, any, any, Workflow>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workflow, import("mongoose").Document<unknown, {}, Workflow, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Workflow, import("mongoose").Document<unknown, {}, Workflow, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Workflow, import("mongoose").Document<unknown, {}, Workflow, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<WorkflowStatus, Workflow, import("mongoose").Document<unknown, {}, Workflow, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    trigger?: import("mongoose").SchemaDefinitionProperty<WorkflowTrigger, Workflow, import("mongoose").Document<unknown, {}, Workflow, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    nodes?: import("mongoose").SchemaDefinitionProperty<WorkflowNode[], Workflow, import("mongoose").Document<unknown, {}, Workflow, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    edges?: import("mongoose").SchemaDefinitionProperty<WorkflowEdge[], Workflow, import("mongoose").Document<unknown, {}, Workflow, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Workflow & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Workflow>;
