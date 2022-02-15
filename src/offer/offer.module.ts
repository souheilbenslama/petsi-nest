import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetService } from 'src/pet/pet.service';
import { OfferController } from './offer.controller';
import { Offer, OfferSchema } from './offer.schema';
import { OfferService } from './offer.service';

@Module({
  controllers: [OfferController],imports:[

    MongooseModule.forFeature([{name: Offer.name, schema: OfferSchema},]),PetService],
  providers: [OfferService]
})
export class OfferModule {}
