import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

export class AddAppointmentDto {
    @IsNotEmpty({message:" appointment place can not be empty"})
    @MinLength(3,{message:" appointment place have at least 3 caracters "})
    @IsString()
    place;

    @IsNotEmpty({message:"appointment date can not be empty"})
    @Type(() => Date)
    date;

    //@IsNotEmpty({message:"appointment report can not be empty"})
    @IsString()
    report;

    @IsIn(['true','false'])
    done;
    
    @IsNotEmpty({message:" vet can not be empty"})
    @IsMongoId()
    vet

    @IsNotEmpty({message:" pet can not be empty"})
    @IsMongoId()
    pet;
}
