import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeightModule } from 'src/weight/weight.module';
import { WeightService } from 'src/weight/weight.service';
import { PetController } from './pet.controller';
import { Pet, PetSchema } from './pet.schema'
import { PetService } from './pet.service';

//import { WeightModule } from './weight/weight.module';

@Module({
  controllers: [ PetController] , imports:[

    MongooseModule.forFeature([{name: Pet.name, schema: PetSchema},]),WeightModule

    ],exports:[PetService], providers: [PetService],
})
export class PetModule {}
