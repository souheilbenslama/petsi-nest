import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

//don't what it does souheil
 export type WeightDocument = Weight & Document;

@Schema({timestamps:true})
export class Weight {
  @Prop({type:Number,required:true})
  weight: Number;
  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'Pet',required:true})
  pet ; //"User";
}

export const WeightSchema = SchemaFactory.createForClass(Weight);