import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true }) title: string;
  @Prop() description: string;
  @Prop() dueDate: Date;
  @Prop({ default: 'Pending' }) status: string;
  @Prop() assignedTo: string;
}
export const TaskSchema = SchemaFactory.createForClass(Task);