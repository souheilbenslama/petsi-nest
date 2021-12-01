/* eslint-disable prettier/prettier */
import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, Delete, UseFilters } from '@nestjs/common';
import { response } from 'express';
import { updateUserDto} from './dto/updateUser.dto'
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

   /*
    @Post()
    @UseFilters( new UserAddFilter())
    async addUser(@Res() response,@Body() user:addUserDto){
       try{
        const newUser = await this.userService.create(user) ;
        return response.status(HttpStatus.CREATED).json(newUser) ;
       }catch(e){
        return response.status(HttpStatus.BAD_REQUEST).send(e) ;
       }
         
        
    }
    */

    @Get(':id')
    async getUser(@Res() response,@Param() param){
        try {
            const user = await this.userService.findOne({ _id : param.id})
            return response.status(HttpStatus.OK).json(user) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('')
    async getAllUser(@Res() response){
        const users = await this.userService.find({})
        return response.status(HttpStatus.OK).json(users) ;
    }

    @Put(':id')
    async updateUser(@Res() response,@Body() user:updateUserDto, @Param() param){
        const updatedUser = await this.userService.findOneAndUpdate({_id: param.id}, user)
        return response.status(HttpStatus.OK).json(updatedUser) ;
    }

    @Delete(':id')
    async deleteUser(@Res() response,@Param("id") id : string){
        const result = await this.userService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
