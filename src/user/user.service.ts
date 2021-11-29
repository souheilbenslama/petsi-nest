import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GenericService } from 'src/generic/generic.service';
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService extends GenericService<UserDocument>{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

  async update(id: string, user: Partial<User>): Promise<User> {
    console.log(id);
    console.log(user);
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user);
    console.log(updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { deleted: true, deleted_At: Date.now() } },
      { new: true },
    );
    return deletedUser;
  }
}
