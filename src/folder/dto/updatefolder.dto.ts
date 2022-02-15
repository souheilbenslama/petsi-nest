import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength,isDate, IsDate, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString, isBoolean, IsBoolean } from 'class-validator';


export class updateFolderDto {

    @IsBoolean()
    confirm;  
    
    @IsIn(["open","closed"])
    status ;
    
    @IsString()
    rapport;

 }