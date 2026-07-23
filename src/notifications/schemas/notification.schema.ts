import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

export enum NotificationType {
  DEAL = 'deal',
  LEAD = 'lead',
  AI = 'ai',
  EMAIL = 'email',
  MEETING = 'meeting',
  ALERT = 'alert',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop()
  message: string;

  @Prop({ type: String, enum: NotificationType, default: NotificationType.INFO })
  type: NotificationType;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  link?: string;

  @Prop()
  relatedEntityType?: string;

  @Prop()
  relatedEntityId?: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
