/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *  as morgan from "morgan" ;
import * as helmet from "helmet" ; 
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const corsOptions = { origin: ['http://localhost:4200'] };
  app.enableCors(corsOptions);
  dotenv.config() ;
  app.use(morgan('dev')) ; 
  app.use(helmet()) ;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
