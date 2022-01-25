import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BathController } from './bath.controller';
import { Bath, BathSchema } from './bath.schema'
import { BathService } from './bath.service';

@Module({
  controllers: [ BathController],
  imports:[MongooseModule.forFeature([{name: Bath.name, schema: BathSchema}])], 
  providers: [BathService],
})
export class BathModule {}