/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConfEmailDocument = ConfEmail & Document;

@Schema({ timestamps: true })
export class ConfEmail {
  @Prop({ type: String, required: true, unique:true, trime: true })
  email: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  token: string;
}

export const ConfEmailSchema = SchemaFactory.createForClass(ConfEmail);
