/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ForgotPasswordDocument = ForgotPassword & Document;

@Schema({ timestamps: true })
export class ForgotPassword {
  @Prop({ type: String, required: true, unique:true, trime: true })
  email: string;

  @Prop({ type: String, required: true, trim: true, unique: true })
  token: string;

  @Prop({ type: Date, expires: '5m', default: Date.now })
      createdAt: Date;
}

export const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);
