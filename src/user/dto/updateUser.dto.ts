/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

//import { errorMessages } from '../../utils/utils'

export class updateUserDto {
  @IsNotEmpty({message:"firstName is empty!"})
  @MinLength(3,{message:"firstName length is less than 3!"})
  @IsString()
  firstName:string;

  @IsNotEmpty({message:"lastName is empty!"})
  @MinLength(3,{message:"lastName length is less than 3!"})
  @IsString()
  lastName:string;

  avatar:string;

  @IsString()
  @IsNotEmpty({message:"birthdate is empty!"})
  birthdate:Date;

  @IsString()
  @IsNotEmpty({message:"adress is empty!"})  
  adress:string;

  @IsString()
  @IsNotEmpty({message:"phone is empty!"}) 
  phone:string;

  @IsString()
  @IsNotEmpty({message:"gender is empty!"})
  gender:string;

 }