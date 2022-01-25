/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, Res, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { addUserDto } from 'src/auth/dto/addUser.dto';
import { RegisterFilter } from './auth.filter';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller()
export class AuthController {
    constructor(private authService:AuthService){}

    @UseInterceptors(FileInterceptor("avatar",{dest:"./uploads"}),ClassSerializerInterceptor)
    @Post("register")
    @UseFilters( new RegisterFilter())
    async register(@Res() response, @Body() user:addUserDto, @UploadedFile() file) {
        user.avatar=file.filename;
        const newUser = await this.authService.register(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ;  
    }

    @Post("login")
    async login(@Res() response , @Body() user:loginDto){
        const newUser = await this.authService.login(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ; 
    }

}
