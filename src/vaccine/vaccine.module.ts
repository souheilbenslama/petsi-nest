import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccineController } from './vaccine.controller';
import { Vaccine, VaccineSchema } from './vaccine.schema'
import { VaccineService } from './vaccine.service';

@Module({
  controllers: [ VaccineController],
  imports:[MongooseModule.forFeature([{name: Vaccine.name, schema: VaccineSchema}])], 
  providers: [VaccineService],
})
export class VaccineModule {}