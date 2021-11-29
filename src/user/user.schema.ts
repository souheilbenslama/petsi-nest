/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import { UserRoleEnum } from 'src/enums/user-role.enum';

//don't what it does souheil
 export type UserDocument = User & Document;


@Schema({timestamps:true})
export class User {
  @Prop({type:String,required:true,unique:true,trime:true})
  email: string;

  @Exclude()
  @Prop({type:String,required:true,trime:true})
  password: string;

  @Prop({type:String,required:true,trim:true})
  firstName: string;

  @Prop({type:String,required:true,trim:true})
  lastName: string;

  @Prop({type:Date,required:true,trim:true})
  birthdate: Date;

  @Prop({ type:String , default:"https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"})
  avatar ;

  @Prop({type:String,required:true,trim:true})
  gender

  @Prop({type:String,required:true,trim:true})
  phone

  @Prop({type:String,required:true,trim:true})
  adress
  
  @Prop({type:String,enum:UserRoleEnum,default:UserRoleEnum.PET_OWNER})
  role ;

  @Prop({type:Boolean,default:false})
  deleted ;
  
  @Prop({type:Date,default:null})
  deleted_At ; 

  @Exclude()
  @Prop({type:String})
  salt ; 
}

export const UserSchema = SchemaFactory.createForClass(User);