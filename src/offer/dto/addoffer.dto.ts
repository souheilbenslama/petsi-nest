import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class addOfferDto {

    
    @IsNotEmpty({message:" offer type  can not be empty"})
    @IsIn(["sell","adopte"])
    type: string;
    

    @IsString()
    description ;
  
    @IsNumber()
    @IsPositive()
    price ;
  
  
    @IsMongoId()
    pet ; //"pet";
  
  
   }