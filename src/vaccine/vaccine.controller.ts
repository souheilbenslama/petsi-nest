import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseFilters } from '@nestjs/common';
import { response } from 'express';
import { ObjectId } from 'mongoose';
import { AddVaccineDto } from './dto/addVaccine.dto';
import { UpdateVaccineDto } from './dto/updateVaccine.dto';
import { VaccineAddFilter } from './vaccine-add.filter';
import { Vaccine } from './vaccine.schema';
import { VaccineService } from './vaccine.service';

@Controller('vaccines')
export class VaccineController {
    constructor(private readonly vaccineService: VaccineService){}
    @Post()
    @UseFilters( new VaccineAddFilter())
    async addVaccine(@Res() response,@Body() vaccine:AddVaccineDto){
        const newVaccine = await this.vaccineService.create(vaccine) ;
        return response.status(HttpStatus.CREATED).json(newVaccine) ;    
    }

 
    @Get()
    async getVaccines(@Res() response){
        const vaccines= await this.vaccineService.find({deleted:false}) ;
        return response.status(HttpStatus.OK).json(vaccines)
    }

    @Get("/one/:id")
    async getVaccineById(@Res()response , @Param("id") id : string ){
        const vaccines= await this.vaccineService.find({_id:id,deleted:false}) ;
        return response.status(HttpStatus.OK).json(vaccines) ;
    }

    @Get("/:uid")
    async getUserVaccines(@Res()response , @Param("uid") id :string){
        const vaccines= await this.vaccineService.find({"owner":id,deleted:false}) ;
        return response.status(HttpStatus.OK).json(vaccines) ;
    }

    @Patch("/:id")
    async updateVaccine(@Res() response , @Param("id") id:string , @Body() update: UpdateVaccineDto){
        const result = await this.vaccineService.findOneAndUpdate({_id:id,deleted:false},{$set:update},{new:true}) ;
        return response.status(HttpStatus.OK).json(result) ;
    }

    @Delete("/:id")
    async deleteVaccine( @Res() response , @Param("id") id : string ) {
        const result = await this.vaccineService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}) ; 
        return response.status(HttpStatus.OK).json(result) ; 
    }
  
}
