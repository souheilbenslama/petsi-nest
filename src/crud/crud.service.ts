import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, UpdateQuery, Model} from "mongoose";
import { BaseModel } from './base.model';

@Injectable()
export class CrudService<T extends  BaseModel> {
    private readonly model: Model<T>;

    constructor(
        private readonly m: Model<T>,
      ) {
          this.model = m
      }

      async findOne(query:FilterQuery<T>): Promise<T>{
          return this.model.findOne(query)
      }

      async find(query:FilterQuery<T>): Promise<T[]>{
          return this.model.find(query)
      }

      async create(data :FilterQuery<T>): Promise<T>{
          return new this.model(data).save()
      }

      async findOneAndUpdate(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<T> {
          return this.model.findOneAndUpdate(query, data)
      }
}
