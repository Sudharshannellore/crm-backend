import { HydratedDocument } from 'mongoose';
export type WorkflowRunDocument = HydratedDocument<WorkflowRun>;
export declare enum WorkflowRunStatus {
    RUNNING = "running",
    SUCCESS = "success",
    FAILED = "failed"
}
export interface WorkflowRunStep {
    nodeId: string;
    type: string;
    status: string;
    output?: Record<string, any>;
    error?: string;
    timestamp: Date;
}
export declare class WorkflowRun {
    workflowId: string;
    startedAt: Date;
    finishedAt?: Date;
    status: WorkflowRunStatus;
    steps: WorkflowRunStep[];
    triggerPayload?: Record<string, any>;
}
export declare const WorkflowRunSchema: import("mongoose").Schema<WorkflowRun, import("mongoose").Model<WorkflowRun, any, any, any, any, any, WorkflowRun>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    workflowId?: import("mongoose").SchemaDefinitionProperty<string, WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    startedAt?: import("mongoose").SchemaDefinitionProperty<Date, WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    finishedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<WorkflowRunStatus, WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    steps?: import("mongoose").SchemaDefinitionProperty<WorkflowRunStep[], WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    triggerPayload?: import("mongoose").SchemaDefinitionProperty<Record<string, any> | undefined, WorkflowRun, import("mongoose").Document<unknown, {}, WorkflowRun, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<WorkflowRun & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, WorkflowRun>;
