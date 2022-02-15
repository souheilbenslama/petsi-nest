import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';


export class UpdateBathDto {

    @Type(() => Date)
    date;

    @IsString()
    description;

    @IsIn(['true','false'])
    done;
    
    @IsMongoId()
    pet;
}
