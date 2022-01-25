import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { MongodbIndexOptions } from 'typeorm';

 export type AppointmentDocument = Appointment & Document;


@Schema({timestamps:true})
export class Appointment {
  @Prop({type:String,trim:true})
  place

  @Prop({type: Date, required:true})
  date

  @Prop({type: String, trim: true})
  report

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

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

  