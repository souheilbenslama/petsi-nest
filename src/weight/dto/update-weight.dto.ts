import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsMongoId, IsNumber, IsPositive, IsIn, IsDateString } from 'class-validator';


export class UpdateWeightDto {
    @IsNumber()
    weight;

    @Type(() => Date)
    date;

    @IsMongoId()
    pet;
}
