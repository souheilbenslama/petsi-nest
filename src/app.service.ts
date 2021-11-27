import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBlobClient(imageName:string):BlockBlobClient{
    const credentials = new StorageSharedKeyCredential( process.env.STORAGE_ACCOUNT_NAME,process.env.ACCOUNT_ACCESS_KEY) ;
    const blobClientService = new BlobServiceClient (`https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,credentials) ; 
    const containerClient = blobClientService.getContainerClient(process.env.CONTAINER_NAME);
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

 async  uploadimage(file : Express.Multer.File){
    const name=uuidv4()+ file.originalname ;
    const blobClient = await this.getBlobClient(name);
    const result =  blobClient.uploadData(file.buffer);
    return name ;
  }


}
