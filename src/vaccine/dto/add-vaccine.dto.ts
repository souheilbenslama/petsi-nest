import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsMongoId, IsIn } from "class-validator";

export class AddVaccineDto {
    @IsNotEmpty({message:"Name is empty!"})
    @IsString()  
    name:string;
    
    @IsNotEmpty({message:"Date is empty!"})
    @Type(()=>Date)
    date: Date;

    @IsNotEmpty({message:"Description is empty!"})
    @IsString()  
    description: string;

    @IsNotEmpty({message:"Name is empty!"})
    @IsIn([true,false]) 
    done: Boolean;

    @IsNotEmpty({message:"Vet is empty!"})
    @IsMongoId()
    vet: string;

    @IsNotEmpty({message:"Pet is empty!"})
    @IsMongoId()
    pet: string;
}
