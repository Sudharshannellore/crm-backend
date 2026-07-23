import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IntegrationDocument = HydratedDocument<Integration>;

export enum IntegrationCategory {
  COMMUNICATION = 'Communication',
  PRODUCTIVITY = 'Productivity',
  PAYMENTS = 'Payments',
  CRM = 'CRM',
  AUTOMATION = 'Automation',
  MARKETING = 'Marketing',
  VIDEO = 'Video',
  SOCIAL = 'Social',
}

export enum IntegrationStatus {
  AVAILABLE = 'available',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

@Schema({ timestamps: true })
export class Integration {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: IntegrationCategory, required: true })
  category: IntegrationCategory;

  // Identifier the frontend maps to a rendered icon component.
  @Prop()
  iconKey: string;

  @Prop({
    type: String,
    enum: IntegrationStatus,
    default: IntegrationStatus.AVAILABLE,
  })
  status: IntegrationStatus;

  @Prop({ type: Date })
  connectedAt: Date;

  // Freeform connection settings (API keys, webhook URLs, etc).
  @Prop({ type: Object })
  config: Record<string, any>;
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);
