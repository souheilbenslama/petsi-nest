import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';


//don't what it does souheil
 export type PetDocument = Pet & Document;


@Schema({timestamps:true})
export class Pet {
  @Prop({type:String,required:true,trim:true})
  name: string;

  @Prop({ type:String , required:true , default:"https://www.thesprucepets.com/thmb/sfuyyLvyUx636_Oq3Fw5_mt-PIc=/3760x2820/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg "})
  image ;
  
  @Prop({type:String,required:true,trim:true})
  type ;

  @Prop({type:String,trim:true})
  breed ;


  @Prop({type:Date,required:true},)
  birthday ;

  @Prop({type:String,required:true})
  sex ;
  @Prop({type:Number,required:true})
  weight ;
  @Prop({type:String,default:"o",required:true})
  status ;
  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  owner ; //"User";
  @Prop({type:Boolean,default:false})
  deleted ; 
  @Prop({type:Date,default:null})
  deleted_At ; 
}

export const PetSchema = SchemaFactory.createForClass(Pet);

  