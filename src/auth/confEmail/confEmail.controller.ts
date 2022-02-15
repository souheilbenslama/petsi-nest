/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { ConfEmailService } from "./confEmail.service";


@Controller()
export class ConfEamilController{

    constructor( 
        private authService: AuthService
    ){}

    @Post("confirmEmail")
    async confirmEmail(@Body("token") token: string){
        await this.authService.confirm(token);
    }
}