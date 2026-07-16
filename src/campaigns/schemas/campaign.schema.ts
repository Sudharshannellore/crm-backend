import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CampaignDocument = HydratedDocument<Campaign>;

export enum CampaignType {
  EMAIL = 'email',
  SOCIAL = 'social',
  WEBINAR = 'webinar',
  ADS = 'ads',
  EVENT = 'event',
}

export enum CampaignStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  ACTIVE = 'active',
}

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: CampaignType, default: CampaignType.EMAIL })
  type: CampaignType;

  @Prop({ type: String, enum: CampaignStatus, default: CampaignStatus.DRAFT })
  status: CampaignStatus;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  // Campaign budget (₹). Stored as a number; the UI formats the currency.
  @Prop({ type: Number })
  budget: number;

  @Prop()
  targetAudience: string;

  @Prop()
  goal: string;

  @Prop()
  description: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
