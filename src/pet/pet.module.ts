import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './pet.controller';
import { Pet, PetSchema } from './pet.schema'
import { PetService } from './pet.service';

@Module({
  controllers: [ PetController],imports:[
    MongooseModule.forFeature([{name: Pet.name, schema: PetSchema}])], providers: [PetService],
})
export class PetModule {}
