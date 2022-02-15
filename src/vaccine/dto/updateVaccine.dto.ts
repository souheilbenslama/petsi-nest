import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';


export class UpdateVaccineDto {
    @MinLength(3,{message:" vaccine name have at least 3 caracters "})
    @IsString()
    name;

    @Type(() => Date)
    date;

    @IsString()
    description;

    @IsIn(['true','false'])
    done;
    
    @IsMongoId()
    vet

    @IsMongoId()
    pet;
}
