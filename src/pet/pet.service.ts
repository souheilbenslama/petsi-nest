import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { ObjectID } from 'typeorm';
import { addPetDto } from './dto/addpet.dto';
import { updatePetDto } from './dto/updatepet.dto';
import { Pet, PetDocument } from "./pet.schema";
import { Weight,WeightDocument } from './weight.schema';

@Injectable()
export class PetService {

    constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument> ,@InjectModel(Weight.name) private weightModel: Model<WeightDocument> ) {}

    // missing getting file for image and user id from the headers

    async createPet(pet: addPetDto): Promise<Pet> {
        
        const newPet = new this.petModel(pet);
       
        const result = await  newPet.save();
        const weightobj= new Weight();
        weightobj.weight=result.weight ;
        weightobj.pet=result._id ;

        const newWeight = new  this.weightModel(weightobj) ;

        const  result2 = await newWeight.save() ;

        return  result ; 
    }

    async findAllPets(): Promise<Pet[]> {
        return await this.petModel.find({deleted:false}).exec();
      }
    
    
    async findByPetId(id:string): Promise<Pet> {
        return await this.petModel.findById(id,{deleted:false}).exec();
      }

    async findPetByUserId(id:string): Promise<Pet[]> {
        return await this.petModel.find({"owner":id,"deleted":false}).exec() ;
      }

    async findPetsForSale(): Promise<Pet[]> {
        return await this.petModel.find({status:"s",deleted:false}).exec() ;
      }  

    async findPetsForAdoption(): Promise<Pet[]> {
        return await this.petModel.find({status:"a",deleted:false}).exec() ;
      }  

    async updatePet(id:string,dto:Partial<updatePetDto>):Promise<Pet>{
        const pet = await this.petModel.findOneAndUpdate({_id:id,deleted:false},{$set:dto},{new:true}) ; 
        
        return pet
}
    async updatePetStatus(id:string,status:string):Promise<Pet>{
    const pet = await this.petModel.findOneAndUpdate({_id:id,deleted:false},{$set:{status:status}},{new:true}) ; 
    return pet
}
    
   async deletePet(id:String) {
    const pet = await this.petModel.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}) ;
    return pet;
   }

}



