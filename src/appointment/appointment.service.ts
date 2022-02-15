import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { AppointmentDocument, Appointment } from './appointment.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AppointmentService extends GenericService<AppointmentDocument>{
    constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) {
        super(appointmentModel);
    }
}
