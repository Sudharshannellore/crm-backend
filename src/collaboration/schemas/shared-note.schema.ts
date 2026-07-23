import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SharedNoteDocument = HydratedDocument<SharedNote>;

@Schema({ timestamps: true })
export class SharedNote {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const SharedNoteSchema = SchemaFactory.createForClass(SharedNote);
