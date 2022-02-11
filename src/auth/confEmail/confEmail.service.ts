/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfEmail, ConfEmailDocument } from "./confEmail.schema";

@Injectable()
export class ConfEmailService{
    constructor(@InjectModel(ConfEmail.name) private confEmailModel: Model<ConfEmailDocument>){}
    async create(body:any){
        return await new this.confEmailModel(body).save();
    }

    async findOne(body:any){
        return this.confEmailModel.findOne(body);
    }

    async delete(token:any){
        return this.confEmailModel.deleteOne({token});
    }
}