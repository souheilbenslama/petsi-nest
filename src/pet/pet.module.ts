import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './pet.controller';
import { Pet, PetSchema } from './pet.schema'
import { PetService } from './pet.service';
import { Weight, WeightSchema } from './weight.schema';
//import { WeightModule } from './weight/weight.module';

@Module({
  controllers: [ PetController],imports:[

    MongooseModule.forFeature([{name: Pet.name, schema: PetSchema},{name: Weight.name, schema: WeightSchema}]),

    ], providers: [PetService],
})
export class PetModule {}
