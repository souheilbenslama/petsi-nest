import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';


export class addFolderDto {

  @IsMongoId()
  vet ; //"User";

  @IsMongoId()
  pet ;

 }