import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, UseFilters, Delete } from '@nestjs/common';
import { response } from 'express';
import { AddWeightDto } from 'src/weight/dto/add-weight.dto';
import { UpdateWeightDto } from 'src/weight/dto/update-Weight.dto'

import { WeightService } from 'src/weight/weight.service';

@Controller('weights')
export class WeightController {
    constructor(private readonly weightService: WeightService){}
    @Post()
    //@UseFilters( new WeightAddFilter())
    async addWeight(@Res() response,@Body() weight:AddWeightDto){
       try{
        const newWeight = await this.weightService.create(weight) ;
        return response.status(HttpStatus.CREATED).json(newWeight) ;
       }catch(e){
        return response.status(HttpStatus.BAD_REQUEST).send(e) ;
       }
         
        
    }

    @Get(':id')
    async getWeight(@Res() response,@Param() param){
        try {
            const weight = await this.weightService.findOne({ _id : param.id})
            return response.status(HttpStatus.OK).json(weight) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('')
    async getAllWeight(@Res() response){
        const weights = await this.weightService.find({})
        return response.status(HttpStatus.OK).json(weights) ;
    }

    @Put(':id')
    async updateWeight(@Res() response,@Body() weight:UpdateWeightDto, @Param() param){
        const updatedWeight = await this.weightService.findOneAndUpdate({_id: param.id}, weight)
        return response.status(HttpStatus.OK).json(updatedWeight) ;
    }

    @Delete(':id')
    async deleteWeight(@Res() response,@Param("id") id : string){
        const result = await this.weightService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
