import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MeetingDocument = HydratedDocument<Meeting>;

export enum MeetingType {
  VIDEO = 'video',
  PHONE = 'phone',
  IN_PERSON = 'in-person',
}

@Schema({ timestamps: true })
export class Meeting {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: MeetingType, default: MeetingType.VIDEO })
  type: MeetingType;

  @Prop({ type: Date, required: true })
  date: Date;

  // Start time, stored as "HH:mm".
  @Prop({ required: true })
  time: string;

  // Duration in minutes.
  @Prop({ type: Number, default: 30 })
  duration: number;

  @Prop()
  location: string;

  @Prop()
  agenda: string;

  // Reminder lead time in minutes before the meeting.
  @Prop({ type: Number, default: 15 })
  reminders: number;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
