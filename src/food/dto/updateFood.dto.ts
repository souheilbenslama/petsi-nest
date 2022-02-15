import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

export class UpdateFoodDto {
    @IsNotEmpty({message:" Food name  can not be empty"})
    @MinLength(3,{message:" Food name have at least 3 caracters "})
    @IsString()
    name;

    @IsNotEmpty({message:"vaccine date  can not be empty"})
    @Type(() => Date)
    date;

    @IsNotEmpty({message:"quantity  can not be empty"})
    @IsNumber()
    quantity;

    @IsIn(['true','false'])
    done;

    @IsNotEmpty({message:" pet can not be empty"})
    @IsMongoId()
    pet;
}
