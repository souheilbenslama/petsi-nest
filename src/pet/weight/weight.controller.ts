import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import {  addWeightDto } from '../dto/addweight.dto';
import { WeightService } from './weight.service';

@Controller('weight')
export class WeightController {

    constructor(private readonly weightService:WeightService ){}

    @Get("/:petId")
    async getPetweights(@Res() response  , @Param("petId") petId : string)  {
        const result = await this.weightService.getPetweights(petId) ;
        return response.status(HttpStatus.OK).json(result) ;
    }

    @Post()
    async addPetWeight(@Res() response , @Body() weight : addWeightDto){
              
        const newWeight = await this.weightService.addPetWeight(weight)    
        
        return response.status(HttpStatus.OK).json(newWeight) ;

    }

    @Patch("/:weightId")
    async updatePetWeight(@Res() response , @Body() weight : addWeightDto, @Param("weightId") weightId : string ){
       
        const updatedWeight = await this.weightService.updatePetWeight(weightId,weight) ; 

        return response.status(HttpStatus.OK).json(updatedWeight) ;


    }
    
    
}
