import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *  as morgan from "morgan" ;
import * as helmet from "helmet" ; 
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = { origin: ['http://localhost:4200'] };
  app.enableCors(corsOptions);
  app.use(morgan('dev')) ; 
  app.use(helmet()) ;
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
