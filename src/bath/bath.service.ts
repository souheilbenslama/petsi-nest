import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { BathDocument, Bath } from './bath.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BathService extends GenericService<BathDocument>{
    constructor(@InjectModel(Bath.name) private bathModel: Model<BathDocument>) {
        super(bathModel);
    }
}
