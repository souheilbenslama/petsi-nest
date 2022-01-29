import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/generic/generic.service';
import { Folder, FolderDocument } from './folder.schema';

@Injectable()
export class FolderService extends  GenericService<FolderDocument> {


    
    constructor(@InjectModel(Folder.name) private folderModel: Model<FolderDocument>  ) {
        super(folderModel) ;
      }

}
