import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, UseFilters, Delete } from '@nestjs/common';
import { response } from 'express';
import { addUserDto } from './dto/adduser.dto';
import { updateUserDto} from './dto/updateUser.dto'
import { UserAddFilter } from './user-add.filter';
import { User } from './user.schema';
import { UserService } from './user.service';
import { UsersService2 } from './user2.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService , private readonly userService2: UsersService2){}


    @Post()
    @UseFilters( new UserAddFilter())
    async addUser(@Res() response,@Body() user:addUserDto){
       
        const newUser = await this.userService.create(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ; 
        
    }

    @Get(':id')
    async getUser(@Res() response,@Param() param){

        //const user = await this.userService.find(param.id)
        const user =await  this.userService2.findOne({ _id: param.id });
        return response.status(HttpStatus.OK).json(user) ;
    }

    @Get('')
    async getAllUser(@Res() response){
        const users = await this.userService.findAll()
        return response.status(HttpStatus.OK).json(users) ;
    }

    @Put(':id')
    async updateUser(@Res() response,@Body() user:updateUserDto, @Param() param){
        const updatedUser = await this.userService.update(param.id, user)
        return response.status(HttpStatus.OK).json(updatedUser) ;
    }

    @Delete(':id')
    async deleteUser(@Res() response,@Param("id") id : string){
        const result = await this.userService.delete(id) ; 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
