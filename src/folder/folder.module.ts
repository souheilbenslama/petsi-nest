import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetService } from 'src/pet/pet.service';
import { FolderController } from './folder.controller';
import { Folder, FolderSchema } from './folder.schema';
import { FolderService } from './folder.service';

@Module({controllers:[FolderController],
  imports:[MongooseModule.forFeature([{name: Folder.name, schema: FolderSchema}])],
  providers: [FolderService]
})
export class FolderModule {}
