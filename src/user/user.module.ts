import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema'
import { UserService } from './user.service';
import { UsersService2 } from './user2.service';

@Module({
  controllers: [ UserController],
  imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}])], 
  providers: [UserService,UsersService2],
})
export class UserModule {}