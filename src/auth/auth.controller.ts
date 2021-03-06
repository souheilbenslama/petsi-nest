/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, Res, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
        if(file){
            user.avatar=file.path;
        }
        try{
            const newUser = await this.authService.register(user) ;
            return response.status(HttpStatus.CREATED).json(newUser) ;
        }catch(e){
            return response.status(HttpStatus.BAD_REQUEST).send(e)
        }  
    }

    @Post("login")
    async login(@Res() response , @Body() user:loginDto){
        const newUser = await this.authService.login(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ; 
    }


}
