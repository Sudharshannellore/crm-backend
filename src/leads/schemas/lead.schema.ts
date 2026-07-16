import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadDocument = HydratedDocument<Lead>;

export enum LeadSource {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  LINKEDIN = 'linkedin',
  COLD_OUTREACH = 'cold_outreach',
  EVENT = 'event',
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  UNQUALIFIED = 'unqualified',
}

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

  // Estimated deal value (₹). Stored as a number; the UI formats the currency.
  @Prop({ type: Number, default: 0 })
  value: number;

  @Prop({ type: String, enum: LeadSource, default: LeadSource.WEBSITE })
  source: LeadSource;

  @Prop({ type: String, enum: LeadStatus, default: LeadStatus.NEW })
  status: LeadStatus;

  @Prop()
  territory: string;

  @Prop()
  notes: string;

  // System-managed fields (not collected by the create form, shown in list views).
  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  score: number;

  @Prop({ type: Date, default: Date.now })
  lastContact: Date;

  // Conversion tracking. Populated once the lead reaches the final stage and
  // is converted into an organization + contact. Presence of `organizationId`
  // marks the lead as already converted (guards against double conversion).
  @Prop()
  organizationId: string;

  @Prop()
  contactId: string;

  @Prop({ type: Date })
  convertedAt: Date;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
