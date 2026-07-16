import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

export enum ContactType {
  CUSTOMER = 'customer',
  PARTNER = 'partner',
  VENDOR = 'vendor',
  INFLUENCER = 'influencer',
}

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string;

  // Job title / role.
  @Prop()
  title: string;

  @Prop()
  company: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: String, enum: ContactType, default: ContactType.CUSTOMER })
  type: ContactType;

  @Prop()
  linkedin: string;

  @Prop()
  location: string;

  @Prop()
  bio: string;

  // Set automatically when the contact is created via lead conversion.
  @Prop()
  organizationId: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
