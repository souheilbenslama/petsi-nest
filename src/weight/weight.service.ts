import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { WeightDocument, Weight } from 'src/weight/weight.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class WeightService extends GenericService<WeightDocument>{
    constructor(@InjectModel(Weight.name) private weightModel: Model<WeightDocument>) {
        super(weightModel);
    }
}
