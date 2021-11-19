import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pet, PetDocument } from "./pet.schema";

@Injectable()
export class PetService {

    constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

    async create(pet: Pet): Promise<Pet> {
        const newPet = new this.petModel(pet);
       
        return newPet.save();
    }
}
