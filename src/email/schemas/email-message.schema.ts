import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmailMessageDocument = HydratedDocument<EmailMessage>;

export enum EmailMailbox {
  INBOX = 'inbox',
  SENT = 'sent',
  DRAFTS = 'drafts',
}

@Schema({ timestamps: true })
export class EmailMessage {
  @Prop({ type: String, enum: EmailMailbox, required: true })
  mailbox: EmailMailbox;

  @Prop({ required: true })
  from: string;

  @Prop({ type: [String], required: true })
  to: string[];

  @Prop({ type: [String] })
  cc: string[];

  @Prop({ type: [String] })
  bcc: string[];

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: false })
  starred: boolean;

  @Prop({ type: Date })
  sentAt: Date;

  @Prop({ type: Date })
  receivedAt: Date;

  @Prop()
  relatedEntityType: string;

  @Prop()
  relatedEntityId: string;
}

export const EmailMessageSchema = SchemaFactory.createForClass(EmailMessage);
