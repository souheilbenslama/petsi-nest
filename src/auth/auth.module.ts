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


dotenv.config();
@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({secret:process.env.SECRET,signOptions:{expiresIn:3600}})
  ],
  providers: [AuthService,JwtStrategy,ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
