import * as mongoose from 'mongoose';
import { Vaccine } from './vaccine.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CrudService } from 'src/crud/crud.service';

@Injectable()
export class VaccineService extends CrudService<Vaccine> {
  constructor(
    @InjectModel('Vaccine')
    private readonly vaccineModel: mongoose.Model<Vaccine>
  ) {
    super(vaccineModel);
  }
}