import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';

export class AddBathDto {
    @IsNotEmpty({message:"bath date  can not be empty"})
    @Type(() => Date)
    date;

    @IsNotEmpty({message:"bath description can not be empty"})
    @IsString()
    description;

    @IsIn(['true','false'])
    done;

    @IsNotEmpty({message:" pet can not be empty"})
    @IsMongoId()
    pet;
}
