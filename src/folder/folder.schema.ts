import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';



 export type FolderDocument = Folder & Document;


@Schema({timestamps:true})
export class Folder {
  @Prop({type:Boolean,default:false,required:true})
  confirm: Boolean;

  @Prop({type:String,required:true,default:"open"},)
  status ;
  @Prop({type:String},)
  rapport;

  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  vet ; //"User";

  @Prop ({type:mongoose.Schema.Types.ObjectId,ref:'Pet'})
  pet ; //"User";

  @Prop({type:Boolean,default:false})
  deleted ; 
  @Prop({type:Date,default:null})
  deleted_At ; 
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
