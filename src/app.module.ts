import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { CrudService } from './crud/crud.service';
import { VaccineModule } from './vaccine/vaccine.module';
import { CrudModule } from './crud/crud.module';


@Module({
  imports: [PetModule,MulterModule,
    MongooseModule.forRoot('mongodb+srv://petsi:petsi@cluster0.mrwox.mongodb.net/petsi2'),
    UserModule,
    VaccineModule,
    CrudModule
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {

}
