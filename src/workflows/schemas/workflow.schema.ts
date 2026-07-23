import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkflowDocument = HydratedDocument<Workflow>;

export enum WorkflowStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
}

// Loose shape mirroring what the XYFlow canvas produces on the frontend.
// Kept as plain interfaces (not sub-schemas) since node/edge `data` payloads
// are heterogeneous across node types.
export interface WorkflowTrigger {
  type: string;
  config?: Record<string, any>;
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  [key: string]: any;
}

@Schema({ timestamps: true })
export class Workflow {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: WorkflowStatus, default: WorkflowStatus.DRAFT })
  status: WorkflowStatus;

  @Prop({ type: Object, default: {} })
  trigger: WorkflowTrigger;

  @Prop({ type: [Object], default: [] })
  nodes: WorkflowNode[];

  @Prop({ type: [Object], default: [] })
  edges: WorkflowEdge[];
}

export const WorkflowSchema = SchemaFactory.createForClass(Workflow);
