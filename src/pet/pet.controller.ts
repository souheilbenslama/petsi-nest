import { Body, Controller, Get, HttpStatus, Post, Res, UseFilters } from '@nestjs/common';
import { response } from 'express';
import { addPetDto } from './dto/addpet.dto';
import { PetAddFilter } from './pet-add.filter';
import { Pet } from './pet.schema';
import { PetService } from './pet.service';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService){}
    @Post()
    @UseFilters( new PetAddFilter())
    async addPet(@Res() response,@Body() pet:addPetDto){
       
        const newPet = await this.petService.create(pet) ;
        return response.status(HttpStatus.CREATED).json({newPet}) ; 
        
    }

}
