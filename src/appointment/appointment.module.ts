import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './appointment.schema'
import { AppointmentService } from './appointment.service';

@Module({
  controllers: [ AppointmentController],
  imports:[MongooseModule.forFeature([{name: Appointment.name, schema: AppointmentSchema}])], 
  providers: [AppointmentService],
})
export class AppointmentModule {}