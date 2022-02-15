/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString, IsEnum } from 'class-validator';
import { UserRoleEnum } from 'src/enums/user-role.enum';

//import { errorMessages } from '../../utils/utils'

export class addUserDto {

  @IsNotEmpty({message:"Email is empty!"})
  @IsEmail()
  email:string;

  @IsNotEmpty({message:"Pasword is empty!"})
  @MinLength(4,{message:"password length is less than 4!"})
  @IsString()
  password:string;

  @IsNotEmpty({message:"firstName is empty!"})
  @IsString()
  firstName:string;

  @IsNotEmpty({message:"lastName is empty!"})
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
  @MinLength(8,{message:"phone number length is less than 8!"})
  @IsNotEmpty({message:"phone is empty!"}) 
  phone:string;

  @IsString()
  @IsNotEmpty({message:"gender is empty!"})
  gender:string;

  @IsEnum(UserRoleEnum,{message:"The role must be one of the valid roles(pet owner/veterinary/admin)"})
  @IsNotEmpty({message:"role is empty!"})
  role:UserRoleEnum;
 }