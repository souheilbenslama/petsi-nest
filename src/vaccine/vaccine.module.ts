import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { VaccineController } from './vaccine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccineSchema } from './vaccine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vaccine', schema: VaccineSchema }]),
  ],
  providers: [VaccineService],
  controllers: [VaccineController]
})
export class VaccineModule {}
