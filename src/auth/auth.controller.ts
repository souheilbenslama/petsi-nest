/* eslint-disable prettier/prettier */
import { Body, ClassSerializerInterceptor, Controller, HttpStatus, Post, Res, UseFilters, UseInterceptors } from '@nestjs/common';
import { addUserDto } from 'src/auth/dto/addUser.dto';
import { azureUploadInterceptor } from 'src/generic/interceptors/azureUpload.interceptor';
import { RegisterFilter } from './auth.filter';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller()
export class AuthController {
    constructor(private authService:AuthService){}

    @UseInterceptors(ClassSerializerInterceptor, azureUploadInterceptor)
    @Post("register")
    @UseFilters( new RegisterFilter())
    async register(@Res() response,@Body() user:addUserDto) {
        console.log("user:", user);
        console.log("response:", response);
        const newUser = await this.authService.register(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ;  
    }

    @Post("login")
    async login(@Res() response , @Body() user:loginDto){
        const newUser = await this.authService.login(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ; 
    }

}
