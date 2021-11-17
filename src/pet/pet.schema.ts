import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class Pet {
  @Prop({})
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}