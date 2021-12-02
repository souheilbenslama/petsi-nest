import { Body, Controller, Put,Get, HttpStatus, Param, Post, Res, UseFilters, Delete } from '@nestjs/common';
import { response } from 'express';
import { AddBathDto } from './dto/add-bath.dto';
import { UpdateBathDto} from './dto/update-bath.dto'
import { BathAddFilter } from './bath-add.filter';
import { Bath } from './bath.schema';
import { BathService } from './bath.service';

@Controller('baths')
export class BathController {
    constructor(private readonly bathService: BathService){}
    @Post()
    //@UseFilters( new BathAddFilter())
    async addBath(@Res() response,@Body() bath:AddBathDto){
       try{
        const newBath = await this.bathService.create(bath) ;
        return response.status(HttpStatus.CREATED).json(newBath) ;
       }catch(e){
        return response.status(HttpStatus.BAD_REQUEST).send(e) ;
       }
         
        
    }

    @Get(':id')
    async getBath(@Res() response,@Param() param){
        try {
            const bath = await this.bathService.findOne({ _id : param.id})
            return response.status(HttpStatus.OK).json(bath) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('')
    async getAllBath(@Res() response){
        const baths = await this.bathService.find({})
        return response.status(HttpStatus.OK).json(baths) ;
    }

    @Put(':id')
    async updateBath(@Res() response,@Body() bath:UpdateBathDto, @Param() param){
        const updatedBath = await this.bathService.findOneAndUpdate({_id: param.id}, bath)
        return response.status(HttpStatus.OK).json(updatedBath) ;
    }

    @Delete(':id')
    async deleteBath(@Res() response,@Param("id") id : string){
        const result = await this.bathService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }
}
