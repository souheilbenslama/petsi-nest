/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ForgotPasswordSchema } from './forgotPassword/forgotPassword.schema';
import { ForgotPasswordService } from './forgotPassword/forgotPassword.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ForgotPasswordController } from './forgotPassword/forgotPassword.controller';
import { UserModule } from 'src/user/user.module';
import { ConfEamilController } from './confEmail/confEmail.controller';
import { ConfEmailService } from './confEmail/confEmail.service';
import { ConfEmailSchema } from './confEmail/confEmail.schema';


dotenv.config();
@Module({
  imports:[
    UserModule,
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        port: 465,
        secure:true,
        auth:{user:"petsi760@gmail.com",pass:"Wala.Souhail.Marouene"},
        tls:{rejectUnauthorized: false}
      }
    }), 
    MongooseModule.forFeature([{name: "ForgotPassword", schema: ForgotPasswordSchema}]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'ConfEmail', schema: ConfEmailSchema }]),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({secret:process.env.SECRET,signOptions:{expiresIn:3600}}),
    MulterModule.register({dest: '../uploads'}),
    NestjsFormDataModule,
  ],
  providers: [AuthService,JwtStrategy,ConfigService,ForgotPasswordService,ConfEmailService],
  controllers: [AuthController, ForgotPasswordController,ConfEamilController],
  exports: []
})
export class AuthModule {}
