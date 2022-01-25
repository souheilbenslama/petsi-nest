import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId, UpdateQuery } from "mongoose";
import { GenericService } from 'src/generic/generic.service';
import { ObjectID } from 'typeorm';
import { addPetDto } from './dto/addpet.dto';
import { updatePetDto } from './dto/updatepet.dto';
import { Pet, PetDocument } from "./pet.schema";
import { WeightService } from 'src/weight/weight.service';

@Injectable()
export class PetService extends GenericService<PetDocument> {

    constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument> , private weightService: WeightService ) {
      super(petModel) ;
    }

    // missing getting file for image and user id from the headers

    async createPet(pet: addPetDto,weight): Promise<Pet> {
      const newPet = await  this.create(pet) ; 
     // will be changed after setting weight services 
     const weightobj= await this.weightService.create({pet:newPet._id,weight:weight}) ; 
      // 
        return  newPet ; 
    }
    
}



