/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class loginDto{

    @IsNotEmpty({message:"Email is empty!"})
    @IsEmail()
    email:string;

    @IsNotEmpty({message:"Pasword is empty!"})
    @IsString()
    password:string;
}