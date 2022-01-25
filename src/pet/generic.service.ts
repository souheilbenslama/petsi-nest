import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';


/**
 * Abstract base service that other services can extend to provide base CRUD
 * functionality such as to create, find, update and delete data.
 */

@Injectable()
export abstract class Generic<T extends Document> {
  private readonly modelName: string;


  /**
   * The constructor must receive the injected model from the child service in
   * order to provide all the proper base functionality.
  
   * @param {Model} model - The injected model.
   */

  constructor( private readonly model: Model<T>) {
    
    for (const modelName of Object.keys(model.collection.conn.models)) {
      if (model.collection.conn.models[modelName] === this.model) {
        this.modelName = modelName;
        break;
      }
    }
  }

  /**
   * Find one entry and return the result.
   *
   * @throws InternalServerErrorException
   */
  async findOne(
    conditions: Partial<Record<keyof T, unknown>>,
    projection: string | Record<string, unknown> = {},
    options: Record<string, unknown> = {},
  ): Promise<T> {
    try {
      return await this.model.findOne(
        conditions as FilterQuery<T>,
        projection,
        options,
      );
    } catch (err) {
     
      throw new InternalServerErrorException();
    }
  }

  // More methods here such as: create, update and delete.
}
