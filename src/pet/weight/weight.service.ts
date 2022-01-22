import { Get, Injectable, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addWeightDto } from '../dto/addweight.dto';
import { Pet, PetDocument } from '../pet.schema';
import { Weight,WeightDocument } from '../weight.schema';
@Injectable()
export class WeightService {

    constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument> ,@InjectModel(Weight.name) private weightModel: Model<WeightDocument> ){}


    async getPetweights( id : string)  {
        return await this.weightModel.find({pet:id}).sort('createdAt').exec()
    }

    async addPetWeight( weight : addWeightDto){
        var date = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0);
        
        await this.weightModel.remove({pet:weight.pet,createdAt:{ $gte : date}})

           const newWeight = new this.weightModel(weight) ;

           const result = await newWeight.save() ;

           const pet= await this.petModel.findById(weight.pet) ; 

         if(pet) {
            const newPet = await this.petModel.findOneAndUpdate({_id:weight.pet},{$set:{weight:result.weight}},{new :true })
            return newPet ;
         }
    }

    async updatePetWeight ( id:string , weight:addWeightDto ){
     
        const newWeight =  await this.weightModel.findByIdAndUpdate({_id:id},{$set:weight},{new:true}) ; 
        return newWeight ; 


    }

    async deleteWeight(id:string ){

        return await this.weightModel.remove({ _id : id }) ; 
    }


}
