import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema({timestamps:true})
export class Offer {
  @Prop({type:String,required:true,trim:true})
  type: string;
  @Prop({ type:Number })
  price ;
  @Prop({type:String})
  description ;
  @Prop({type:Boolean,default:false,required:true,})
  confirmation ;
  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'Pet'})
  pet ; //"pet";
  @Prop ({type:[mongoose.Schema.Types.ObjectId],ref:'User'})
  buyers ; //"User";
  @Prop({type:Boolean,default:false})
  deleted ; 
  @Prop({type:Date,default:null})
  deleted_At ; 
}

export const OfferSchema = SchemaFactory.createForClass(Offer);

  