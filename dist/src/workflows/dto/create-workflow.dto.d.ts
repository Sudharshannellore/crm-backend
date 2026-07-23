import { WorkflowStatus } from '../schemas/workflow.schema';
declare class TriggerDto {
    type: string;
    config?: Record<string, any>;
}
export declare class CreateWorkflowDto {
    name: string;
    description?: string;
    status?: WorkflowStatus;
    trigger?: TriggerDto;
    nodes?: Record<string, any>[];
    edges?: Record<string, any>[];
}
export {};
