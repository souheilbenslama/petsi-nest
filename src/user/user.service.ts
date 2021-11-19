import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: Partial<User>): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async find(id: number): Promise<User> {
        const user = await this.userModel.findById(id)
        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find()
        return users;
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        console.log(id)
        console.log(user)
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user);
        console.log(updatedUser)
        return updatedUser
    }

    async delete(id: string): Promise<User>{
        const deletedUser = await this.userModel.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}) ;
        return deletedUser;
    }
}
