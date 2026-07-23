import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkflowRunDocument = HydratedDocument<WorkflowRun>;

export enum WorkflowRunStatus {
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface WorkflowRunStep {
  nodeId: string;
  type: string;
  status: string;
  output?: Record<string, any>;
  error?: string;
  timestamp: Date;
}

@Schema({ timestamps: true })
export class WorkflowRun {
  @Prop({ required: true })
  workflowId: string;

  @Prop({ type: Date, default: () => new Date() })
  startedAt: Date;

  @Prop({ type: Date })
  finishedAt?: Date;

  @Prop({ type: String, enum: WorkflowRunStatus, default: WorkflowRunStatus.RUNNING })
  status: WorkflowRunStatus;

  @Prop({ type: [Object], default: [] })
  steps: WorkflowRunStep[];

  @Prop({ type: Object })
  triggerPayload?: Record<string, any>;
}

export const WorkflowRunSchema = SchemaFactory.createForClass(WorkflowRun);
