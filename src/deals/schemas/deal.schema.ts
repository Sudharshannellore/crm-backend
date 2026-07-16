import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DealDocument = HydratedDocument<Deal>;

export enum DealStage {
  DISCOVERY = 'discovery',
  QUALIFICATION = 'qualification',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
}

export enum DealPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Schema({ timestamps: true })
export class Deal {
  @Prop({ required: true })
  title: string;

  @Prop()
  company: string;

  // Deal value (₹). Stored as a number; the UI formats the currency.
  @Prop({ type: Number, required: true, default: 0 })
  value: number;

  @Prop({ type: Date })
  closeDate: Date;

  @Prop()
  owner: string;

  @Prop({ type: String, enum: DealStage, default: DealStage.DISCOVERY })
  stage: DealStage;

  @Prop({ type: String, enum: DealPriority, default: DealPriority.MEDIUM })
  priority: DealPriority;

  @Prop({ type: Number, default: 20, min: 0, max: 100 })
  probability: number;

  @Prop()
  description: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
