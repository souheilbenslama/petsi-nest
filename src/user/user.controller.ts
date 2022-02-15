/* eslint-disable prettier/prettier */
import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, Delete, UseFilters, Patch } from '@nestjs/common';
import { response } from 'express';
import { updateUserDto} from './dto/updateUser.dto'
import { User } from './user.schema';
import { UserService } from './user.service';
import { UserRoleEnum } from 'src/enums/user-role.enum';

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

    @Get('vets')
    async getVets(@Res() response,@Param() param){
        try {
            const user = await this.userService.find({ role :UserRoleEnum.VETERINARY })
            return response.status(HttpStatus.OK).json(user) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get(':id')
    async getUser(@Res() response,@Param() param){
        try {
            const user = await this.userService.findOne({ _id : param.id})
            user.password = undefined;
            user.salt = undefined;
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
    async updateUser(@Res() response,@Body() user:Partial<updateUserDto>, @Param() param){
        console.log("user",user.adress);
        const updatedUser = await this.userService.findOneAndUpdate({_id: param.id}, user, {new:true});
        console.log("update",updatedUser);
        return response.status(HttpStatus.OK).json(updatedUser) ;
    }

    @Delete(':id')
    async deleteUser(@Res() response,@Param("id") id : string){
        const result = await this.userService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
