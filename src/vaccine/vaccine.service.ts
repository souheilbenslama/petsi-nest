import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { VaccineDocument, Vaccine } from './vaccine.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class VaccineService extends GenericService<VaccineDocument>{
    constructor(@InjectModel(Vaccine.name) private vaccineModel: Model<VaccineDocument>) {
        super(vaccineModel);
    }
}
