/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema({ timestamps: true })
export class ForgotPassword {
  @Prop({ type: String, required: true, trime: true })
  email: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  token: string;
}

export const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);
