import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MongodbIndexOptions } from 'typeorm';

 export type WeightDocument = Weight & Document;


@Schema({timestamps:true})
export class Weight {
  @Prop({type:Number,required:true,trim:true})
  weight

  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'Pet'})
  pet

  @Prop({type:Boolean,default:false})
  deleted

  @Prop({type:Date,default:null})
  deleted_At 
}

export const WeightSchema = SchemaFactory.createForClass(Weight);

  