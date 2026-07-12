import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DealDocument = HydratedDocument<Deal>;

@Schema({ timestamps: true })
export class Deal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  stage: string;

  @Prop()
  accountId: string;

  @Prop()
  contactId: string;

  @Prop()
  expectedCloseDate: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
