/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private jwtService:JwtService) {}

    async register(user: Partial<User>): Promise<User> {
        console.log("hellooooooooooooooooooooooooooooooooooo");
        const newUser = new this.userModel(user);
        const alreadyUser = await this.userModel.findOne({email:user.email});
        if(user) throw new UnauthorizedException('Email already in use!');
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(newUser.password, newUser.salt);
        try{
          await newUser.save();
        }catch(e){
          throw new ConflictException("Saving new user error");
        }
        delete newUser.password;
        delete newUser.salt;
        return newUser;
      }

    async login(userData: Partial<User>){
        const user = await this.userModel.findOne({email:userData.email})
        if (!user) throw new UnauthorizedException('Credentials incorrect');
        if (!bcrypt.compare(userData.password,user.password)){
            throw new UnauthorizedException('password incorrect');
        }
        const payload = {firstName:user.firstName,email:user.email,role:user.role}
        const jwt = await this.jwtService.sign(payload);
        delete user.password;
        delete user.salt;
        return {"user":user,"access_token":jwt};
    }
}
