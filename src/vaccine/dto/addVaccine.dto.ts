import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

export class AddVaccineDto {
    @IsNotEmpty({message:" vaccine name  can not be empty"})
    @MinLength(3,{message:" vaccine name have at least 3 caracters "})
    @IsString()
    name;

    @IsNotEmpty({message:"vaccine date  can not be empty"})
    @Type(() => Date)
    date;

    @IsNotEmpty({message:"vaccine description can not be empty"})
    @IsString()
    description;

    @IsIn(['true','false'])
    done;
    
    @IsNotEmpty({message:" vet can not be empty"})
    @IsMongoId()
    vet

    @IsNotEmpty({message:" pet can not be empty"})
    @IsMongoId()
    pet;
}
