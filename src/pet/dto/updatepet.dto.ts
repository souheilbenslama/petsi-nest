import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

//import { errorMessages } from '../../utils/utils'

export class updatePetDto {

  
  @MinLength(3,{message:"pet name have at least 3 caracters "})
  @IsString()
  name: string;
  
  image ;
  
  type ;
  
  breed ;

  birthday ;

  sex ;
  
  weight ;

  status ;
 }