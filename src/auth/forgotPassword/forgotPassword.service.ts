/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ForgotPassword, ForgotPasswordDocument } from "./forgotPassword.schema";

@Injectable()
export class ForgotPasswordService{
    constructor(@InjectModel(ForgotPassword.name) private forgotPasswordModel: Model<ForgotPasswordDocument>){}
    async create(body:any){
        return await new this.forgotPasswordModel(body).save();
    }

    async findOne(body:any){
        return this.forgotPasswordModel.findOne(body);
    }
}