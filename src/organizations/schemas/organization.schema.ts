import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

export enum Industry {
  TECHNOLOGY = 'technology',
  FINANCE = 'finance',
  HEALTHCARE = 'healthcare',
  MANUFACTURING = 'manufacturing',
  RETAIL = 'retail',
  OTHER = 'other',
}

export enum OrganizationType {
  ENTERPRISE = 'enterprise',
  MID_MARKET = 'mid_market',
  SMB = 'smb',
}

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop()
  website: string;

  @Prop({ type: String, enum: Industry, default: Industry.TECHNOLOGY })
  industry: Industry;

  @Prop({ type: String, enum: OrganizationType, default: OrganizationType.ENTERPRISE })
  type: OrganizationType;

  @Prop({ type: Number })
  employeeCount: number;

  // Annual revenue (₹). Stored as a number; the UI formats the currency.
  @Prop({ type: Number })
  annualRevenue: number;

  @Prop()
  billingAddress: string;

  @Prop()
  phone: string;

  @Prop()
  description: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
