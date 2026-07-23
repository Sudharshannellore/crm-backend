import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ThreadDocument = HydratedDocument<Thread>;

@Schema({ _id: false })
export class ThreadMessage {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Date, default: () => new Date() })
  timestamp: Date;
}

export const ThreadMessageSchema = SchemaFactory.createForClass(ThreadMessage);

@Schema({ timestamps: true })
export class Thread {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], default: [] })
  participants: string[];

  @Prop({ type: [ThreadMessageSchema], default: [] })
  messages: ThreadMessage[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  unread: number;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
