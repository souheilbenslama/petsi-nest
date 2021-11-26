import * as mongoose from 'mongoose';

export const VaccineSchema = new mongoose.Schema(
  {
    name:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    done:{type:Boolean,default:false},
    vet:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    pet:{type:mongoose.Schema.Types.ObjectId,ref:'Pet',required:true}
  },
  { collection: 'vaccines' },
);

VaccineSchema.pre('save', function(next: Function) {
  console.log('saving...');
  next();
});