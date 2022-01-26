import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, UseFilters, Delete } from '@nestjs/common';
import { response } from 'express';
import { AddVaccineDto } from 'src/vaccine/dto/addVaccine.dto';
import { UpdateVaccineDto} from './dto/updateVaccine.dto'
import { VaccineAddFilter } from './vaccine-add.filter';
import { Vaccine } from './vaccine.schema';
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService){}
    @Post()
    //@UseFilters( new VaccineAddFilter())
    async addVaccine(@Res() response,@Body() vaccine:AddVaccineDto){
       try{
        const newVaccine = await this.vaccineService.create(vaccine) ;
        return response.status(HttpStatus.CREATED).json(newVaccine) ;
       }catch(e){
        return response.status(HttpStatus.BAD_REQUEST).send(e) ;
       }
         
        
    }

    @Get('/pet/:id')
    async getpPetVaccine(@Res() response,@Param() param){
        try {
            const vaccine = await this.vaccineService.find({ pet : param.id})
            return response.status(HttpStatus.OK).json(vaccine) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get(':id')
    async getVaccine(@Res() response,@Param() param){
        try {
            const vaccine = await this.vaccineService.findOne({ _id : param.id})
            return response.status(HttpStatus.OK).json(vaccine) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('')
    async getAllVaccine(@Res() response){
        const vaccines = await this.vaccineService.find({})
        return response.status(HttpStatus.OK).json(vaccines) ;
    }

    @Put(':id')
    async updateVaccine(@Res() response,@Body() vaccine:UpdateVaccineDto, @Param() param){
        const updatedVaccine = await this.vaccineService.findOneAndUpdate({_id: param.id}, vaccine)
        return response.status(HttpStatus.OK).json(updatedVaccine) ;
    }

    @Delete(':id')
    async deleteVaccine(@Res() response,@Param("id") id : string){
        const result = await this.vaccineService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
