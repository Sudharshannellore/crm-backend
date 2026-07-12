import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true })
  name: string;

  @Prop()
  industry: string;

  @Prop()
  website: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
