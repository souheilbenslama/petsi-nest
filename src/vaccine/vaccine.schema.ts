import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MongodbIndexOptions } from 'typeorm';

 export type VaccineDocument = Vaccine & Document;


@Schema({timestamps:true})
export class Vaccine {
  @Prop({type:String,required:true,trim:true})
  name

  @Prop({type: Date, required:true})
  date

  @Prop({type: String, trim: true})
  description

  @Prop({type: Boolean, default: false})
  done

  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  vet

  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'Pet'})
  pet

  @Prop({type:Boolean,default:false})
  deleted

  @Prop({type:Date,default:null})
  deleted_At 
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);

  