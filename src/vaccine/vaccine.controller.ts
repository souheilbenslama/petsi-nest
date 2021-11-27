import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, UseFilters, Delete } from '@nestjs/common';
import { response } from 'express';
import { AddVaccineDto } from './dto/add-vaccine.dto';
import { UpdateVaccineDto} from './dto/update-Vaccine.dto'
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService){}


    @Post()
    async addVaccine(@Res() response,@Body() vaccine:AddVaccineDto){
       
        const newVaccine = await this.vaccineService.create(vaccine) ;
        return response.status(HttpStatus.CREATED).json(newVaccine) ; 
        
    }

    @Get(':id')
    async getVaccine(@Res() response,@Param() param){

        const vaccine = await this.vaccineService.findOne({_id: param.id})
        return response.status(HttpStatus.OK).json(vaccine) ;
    }

    @Get('')
    async getAllVaccine(@Res() response){
        const vaccines = await this.vaccineService.find({})
        return response.status(HttpStatus.OK).json(vaccines) ;
    }

    @Put(':id')
    async updateVaccine(@Res() response,@Body() vaccine:UpdateVaccineDto, @Param() param){
        const updatedVaccine = await this.vaccineService.findOneAndUpdate(param.id, vaccine)
        return response.status(HttpStatus.OK).json(updatedVaccine) ;
    }

    @Delete(':id')
    async deleteVaccine(@Res() response,@Param("id") param){
        const result = await this.vaccineService.findOneAndUpdate(param.id, {name: 'deleted'}) ; 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}

