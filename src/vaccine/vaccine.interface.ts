import { BaseModel } from 'src/crud/base.model';

export interface Vaccine extends BaseModel {
  readonly name: string;
  readonly date: Date;
  readonly description: string;
  readonly done: Boolean;
  readonly vet: string;
  readonly pet: string;
}