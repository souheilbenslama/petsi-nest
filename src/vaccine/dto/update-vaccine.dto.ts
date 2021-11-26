import { AddVaccineDto } from "./add-vaccine.dto"
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVaccineDto extends PartialType(AddVaccineDto){}
