import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './food.schema';

@Module({
  providers: [FoodService],imports:[MongooseModule.forFeature([{name: Food.name, schema: FoodSchema}])],
  controllers: [FoodController]
})
export class FoodModule {}
