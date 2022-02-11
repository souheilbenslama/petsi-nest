/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfEmailService } from './confEmail/confEmail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private jwtService:JwtService,
      private confEmailService:ConfEmailService,
      private mailerService: MailerService,
      ) {}


    async genToken(user: User){
      const payload = {firstName:user.firstName,email:user.email,role:user.role};
      return  await this.jwtService.sign(payload);
    }

    async register(user: Partial<User>){ //}: Promise<User> {
        const newUser = new this.userModel(user);
        const alreadyUser = await this.userModel.findOne({email:user.email});
        if(alreadyUser) throw new UnauthorizedException('Email already in use!');
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(newUser.password, newUser.salt);
        try{
          await newUser.save();
        }catch(e){
          console.log(e);
          throw new ConflictException("Saving new user error");
        }
        newUser.password = undefined;
        newUser.salt = undefined;
        await this.sendConfirmation(newUser);
      }

    async login(userData: Partial<User>){
        const user = await this.userModel.findOne({email:userData.email})
        if (!user) throw new UnauthorizedException('Wrong credentials!');
        const isMatch = await bcrypt.compare(userData.password,user.password)
        if(isMatch){
          if (!user.active) throw new UnauthorizedException('Account not verified yet!');
          const jwt = await this.genToken(user);
          console.log(jwt);
          user.password = undefined;
          user.salt = undefined;
          return {"user":user,"access_token":jwt};
        }else{
          throw new UnauthorizedException('Wrong credentials!');
        }
    }


    async confirm(token: string){
      const data = await this.verifyToken(token);
      const user = await this.userModel.findOne({email:data.email});

      await this.confEmailService.delete(token);

      if (user && !user.active ) {
          user.active = true;
          await user.save();
          return {message:"success"}
      }
      throw new BadRequestException('Confirmation error');
  }

  async sendConfirmation(user: User) {
      const token = await this.genToken(user);
      const confirmLink = `http://localhost:4200/confirmEmail/${token}`;
      await this.confEmailService.create({ token, email: user.email });
      const mailOptions = {to:user.email,subject:'Verify User',html:`Please use this <a href="${confirmLink}">link</a> to confirm your account.`};
      await this.mailerService.sendMail(mailOptions);
      return {message:"success"};
  }

  private async verifyToken(token): Promise<any> {
    try {
        const data = this.jwtService.verify(token);
        const tokenExists = await this.confEmailService.findOne({token});
        if (tokenExists) {
            return data;
        }
        throw new UnauthorizedException();
    } catch (error) {
        throw new UnauthorizedException();
    }
  }



}
