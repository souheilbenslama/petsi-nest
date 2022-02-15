import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

//import { errorMessages } from '../../utils/utils'

export class addPetDto {

  @IsNotEmpty({message:" pet name  can not be empty"})
  @MinLength(3,{message:"pet name have at least 3 caracters "})
  @IsString()
  name: string;
  image ;
  
  @IsNotEmpty({message:" pet type  can not be empty"})
  @IsString()
  type ;

  
  breed ;

  @Type(()=>Date)
  birthday ;

  @IsIn(["Male","Female"])
  sex ;


 @IsNumber()
 @IsPositive()
  weight ;   


  status ;

  @IsMongoId()
  owner ; //"User";



 }