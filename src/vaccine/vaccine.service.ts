import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { VaccineDocument } from './vaccine.schema';

@Injectable()
export class VaccineService extends GenericService<VaccineDocument>{}
