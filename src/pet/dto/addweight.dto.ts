import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

//import { errorMessages } from '../../utils/utils'

export class addWeightDto {
 
  weight: Number;
  
  type ;
  @IsMongoId()
  owner ; //"User";



 }