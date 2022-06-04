import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AddFoodDto } from './dto/addFood.dto';
import { UpdateFoodDto } from './dto/updateFood.dto';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
    constructor ( private readonly foodService : FoodService){}
  
    @Post()
    async addFood(@Res() response , @Body() food: AddFoodDto  ){
        try{
            const newFood = await this.foodService.create(food) ; 
            return response.status(HttpStatus.CREATED).json(newFood) ; 

        }catch(e){
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('/pet/:id')
    async getPetFood(@Res() response,@Param() param){
        try {
            const foods = await this.foodService.find({ pet : param.id})
            return response.status(HttpStatus.OK).json(foods) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    
    @Get(':id')
    async getFood(@Res() response,@Param() param){
        try {
            const foods = await this.foodService.findOne({ _id : param.id})
            return response.status(HttpStatus.OK).json(foods) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }
    
    @Get('')
    async getAllFood(@Res() response){
        const foods = await this.foodService.find({})
        return response.status(HttpStatus.OK).json(foods) ;
    }

    @Put(':id')
    async updateFood(@Res() response,@Body() food:Partial<UpdateFoodDto>, @Param() param){
        const updatedFood = await this.foodService.findOneAndUpdate({_id: param.id}, food)
        return response.status(HttpStatus.OK).json(updatedFood) ;
    }

    
    @Delete(':id')
    async deleteFood(@Res() response,@Param("id") id : string){
        const result = await this.foodService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}); 
        return response.status(HttpStatus.OK).json(result) ; 
    }

}
