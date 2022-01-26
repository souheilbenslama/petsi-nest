/* eslint-disable prettier/prettier */
import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Body, Controller, NotFoundException, Post, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from "src/user/user.schema";
import { ForgotPasswordService } from "./forgotPassword.service";
import { UserService } from "src/user/user.service";

@Controller()
export class ForgotPasswordController{

    constructor(
        private forgotPasswordService: ForgotPasswordService,
        private mailerService: MailerService,
        private userService: UserService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        ){}

    @Post("forgotPassword")
    async forgot(@Body("email") email: string){
        const user = await this.userModel.findOne({email:email})
        if (!user) throw new UnauthorizedException('There is no account with this email!');
        const token = Math.random().toString(20).substring(2,12);
        await this.forgotPasswordService.create({
            email,token
        });   
        const url = `http://localhost:3000/reset/${token}`;
        const mailOptions = {to:email,subject:"Reset your password!",html:`Click <a href="${url}">here</a> to reset your password!`};
        await this.mailerService.sendMail(mailOptions);
        return {message: "Please check your email!"};
    }

    @Post("reset")
    async reset(
        @Body("token") token :string,
        @Body("password") password :string,
        @Body("password_confirm") password_confirm :string,
    ){
        if(password !== password_confirm){
            throw new BadRequestException("Password does not match!");
        }
        const passwordReset:any = await this.forgotPasswordService.findOne({token});
        const user = await this.userModel.findOne({email:passwordReset.email});
        if(!user){
            throw new NotFoundException("User not found!");
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await this.userService.update(user._id, {password: hashedPassword});
        return {message: "success"}
    }

    
}