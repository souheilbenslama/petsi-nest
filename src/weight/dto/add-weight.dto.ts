import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

export class AddWeightDto {
    @IsNotEmpty({message:"weight can not be empty"})
    @IsNumber()
    weight;


    @IsNotEmpty({message:" pet can not be empty"})
    @IsMongoId()
    pet;
}
