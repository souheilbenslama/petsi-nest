import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

//import { errorMessages } from '../../utils/utils'

export class updateWeightDto {
 
  @IsPositive()
  weight: Number;
  
  @IsMongoId()
  pet ; //"User";

 }