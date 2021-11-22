import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [PetModule,
    MongooseModule.forRoot('mongodb+srv://petsi:petsi@cluster0.mrwox.mongodb.net/petsi2'),
    UserModule
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
