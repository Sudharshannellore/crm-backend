import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadDocument = HydratedDocument<Lead>;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: 'new' })
  status: string;

  @Prop()
  source: string;

  @Prop({ type: Number })
  value: number;

  @Prop({ type: Date, default: Date.now })
  lastContact: Date;

  @Prop()
  territory: string;

  @Prop()
  notes: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
