/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { addPetDto } from './dto/addpet.dto';
import { updatePetDto } from './dto/updatepet.dto';
import { PetAddFilter } from './pet-add.filter';
import { Pet } from './pet.schema';
import { PetService } from './pet.service';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseFilters( new PetAddFilter())
    async addPet(@Res() response,@Body() pet:addPetDto){
       
        const newPet = await this.petService.createPet(pet) ;
        return response.status(HttpStatus.CREATED).json(newPet) ;    
    }
 
    @Get()
    async getPets(@Res() response){
        const pets= await this.petService.findAllPets() ;
        return response.status(HttpStatus.OK).json(pets)
    }

    @Get("/one/:id")
    async getPetById(@Res()response , @Param("id") id : string ){
        const pets= await this.petService.findByPetId(id) ;
        return response.status(HttpStatus.OK).json(pets) ;
    }

    @Get("/:uid")
    async getUserPets(@Res()response , @Param("uid") id :string){
        const pets= await this.petService.findPetByUserId(id) ;
        return response.status(HttpStatus.OK).json(pets) ;

    }

    @Patch("/:id")
    @UseGuards(JwtAuthGuard)
    async updatePet(@Res() response , @Param("id") id:string , @Body() update: updatePetDto){
        const result = await this.petService.updatePet(id,update) ;
        return response.status(HttpStatus.OK).json(result) ;
    }

    @Delete("/:id")
    @UseGuards(JwtAuthGuard)
    async deletePet( @Res() response , @Param("id") id : string ) {
        const result = await this.petService.deletePet(id) ; 
        return response.status(HttpStatus.OK).json(result) ; 
    }
  
}
