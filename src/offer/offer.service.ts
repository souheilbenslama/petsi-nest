import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/generic/generic.service';
import { PetService } from 'src/pet/pet.service';
import { addOfferDto } from './dto/addoffer.dto';
import {Offer, OfferDocument } from 'src/offer/offer.schema';

@Injectable()
export class OfferService extends GenericService<OfferDocument> {
 
    constructor(@InjectModel(Offer.name) private offerModel: Model<OfferDocument>, private petService: PetService ) {
        super(offerModel) ;
      }

    async createOffer(offer: addOfferDto,): Promise<Offer> {
        
        const pet = await this.petService.findOne({_id:offer.pet,deleted:false}) ;
        if(pet== null)
         throw new NotFoundException("pet doesn't exist")
        const newOffer = await  this.create(offer) ;  
        return  newOffer ; 
      }

}
