import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/generic/generic.service';
import { Food, FoodDocument } from './food.schema';

@Injectable()
export class FoodService extends GenericService<FoodDocument> {

    constructor (@InjectModel(Food.name) private foodModel: Model<FoodDocument>){
        super(foodModel) ;
    }
}
