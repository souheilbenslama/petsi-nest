/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Req, Res, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
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
        const newUser = await this.authService.register(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ;  
    }

    @Post("login")
    async login(@Res() response , @Body() user:loginDto){
        const newUser = await this.authService.login(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ; 
    }

    @Get("getRole")
    async getRole(@Req() req: Request, @Res() response){
        const token = req.headers.authorization.replace("Bearer ", "");
        const user = await this.authService.getRole(token);
        const role = Object(user).role;
        return response.status(HttpStatus.OK).json({role}) ;
    }

}
