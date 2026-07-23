import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

export enum TemplateCategory {
  SALES = 'Sales',
  COMMUNICATION = 'Communication',
  DEALS = 'Deals',
  ONBOARDING = 'Onboarding',
  FOLLOW_UP = 'Follow-up',
  MARKETING = 'Marketing',
}

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop()
  subject: string;

  // Template body text. May include placeholder tokens like {{contact_name}} — stored as plain string, no templating engine.
  @Prop({ required: true })
  content: string;

  @Prop({ type: String, enum: TemplateCategory, default: TemplateCategory.SALES })
  category: TemplateCategory;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Number, default: 0 })
  usageCount: number;

  @Prop({ type: Date })
  lastUsedAt: Date;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
