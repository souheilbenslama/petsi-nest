import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema({timestamps:true})
export class Food {
  @Prop({type:String,required:true,trim:true})
  name: string;
  @Prop({ type:Number })
  quantity ;
  @Prop({type:Date,required:true})
  date ; 
  @Prop({type:Boolean,default:false,required:true,})
  done ;
  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'Pet'})
  pet ; //"pet";
  @Prop({type:Boolean,default:false})
  deleted ; 
  @Prop({type:Date,default:null})
  deleted_At ; 
}

export const FoodSchema = SchemaFactory.createForClass(Food);

  