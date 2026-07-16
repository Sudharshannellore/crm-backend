import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskCategory {
  FOLLOW_UP = 'follow_up',
  MEETING = 'meeting',
  DEMO = 'demo',
  PROPOSAL = 'proposal',
  CONTRACT = 'contract',
  OTHER = 'other',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Date })
  dueDate: Date;

  // Time of day, stored as "HH:mm" (paired with dueDate).
  @Prop()
  dueTime: string;

  @Prop()
  assignee: string;

  @Prop({ type: String, enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Prop({ type: String, enum: TaskCategory, default: TaskCategory.FOLLOW_UP })
  category: TaskCategory;

  // Free-text reference to a related record (lead, deal, contact, etc.).
  @Prop()
  relatedTo: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
