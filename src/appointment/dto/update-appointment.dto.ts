import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';


export class UpdateAppointmentDto {
    @MinLength(3,{message:"appointment place have at least 3 caracters "})
    @IsString()
    place;

    @Type(() => Date)
    date;

    @IsString()
    report;

    @IsIn(['true','false'])
    done;
    
    @IsMongoId()
    vet

    @IsMongoId()
    pet;
}
