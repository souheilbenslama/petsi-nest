import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, UseFilters, Delete } from '@nestjs/common';
import { response } from 'express';
import { AddAppointmentDto } from 'src/appointment/dto/add-appointment.dto'
import { UpdateAppointmentDto } from 'src/appointment/dto/updateappointment.dto'

import { AppointmentService } from 'src/appointment/appointment.service';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService){}
    @Post()
    //@UseFilters( new AppointmentAddFilter())
    async addAppointment(@Res() response,@Body() appointment:AddAppointmentDto){
       try{
        const newAppointment = await this.appointmentService.create(appointment) ;
        return response.status(HttpStatus.CREATED).json(newAppointment) ;
       }catch(e){
        return response.status(HttpStatus.BAD_REQUEST).send(e) ;
       }
         
        
    }

    @Get(':id')
    async getAppointment(@Res() response,@Param() param){
        try {
            const appointment = await this.appointmentService.findOne({ _id : param.id})
            return response.status(HttpStatus.OK).json(appointment) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('')
    async getAllAppointment(@Res() response){
        const appointments = await this.appointmentService.find({})
        return response.status(HttpStatus.OK).json(appointments) ;
    }

    @Put(':id')
    async updateAppointment(@Res() response,@Body() appointment:UpdateAppointmentDto, @Param() param){
        const updatedAppointment = await this.appointmentService.findOneAndUpdate({_id: param.id}, appointment)
        return response.status(HttpStatus.OK).json(updatedAppointment) ;
    }

    @Delete(':id')
    async deleteAppointment(@Res() response,@Param("id") id : string){
        const result = await this.appointmentService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
