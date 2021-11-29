/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { addUserDto } from 'src/user/dto/adduser.dto';
import { RegisterFilter } from './auth.filter';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller()
export class AuthController {
    constructor(private authService:AuthService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post("register")
    @UseFilters( new RegisterFilter())
    async register(@Res() response,@Body() user:addUserDto){
        const newUser = await this.authService.register(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ;  
    }

    @Post("login")
    async login(@Res() response,@Body() user:loginDto){
        const newUser = await this.authService.login(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ; 
    }

}
