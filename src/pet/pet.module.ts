import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './pet.controller';
import { Pet, PetSchema } from './pet.schema'

@Module({
  controllers: [ PetController],imports:[

    MongooseModule.forFeature([{name: Pet.name, schema: PetSchema}])],
})
export class PetModule {}
