import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PetService } from 'src/pet/pet.service';
import { addFolderDto } from './dto/addfolder.dto';
import { updateFolderDto } from './dto/updatefolder.dto';
import { FolderService } from './folder.service';

@Controller('folders')
export class FolderController {

    constructor(private readonly folderService: FolderService ){}



    
    @Post()
    // @UseGuards(JwtAuthGuard)
    async addFolder(@Res() response,@Body() folder:addFolderDto ){
        
        const newFolder = await this.folderService.create(folder) ;
        return response.status(HttpStatus.CREATED).json(newFolder) ;    
    }


    @Get('/vetFolders/:id')
    async getVetFolder(@Res() response,@Param("id") id:string){
        try {
            const folders = await this.folderService.find({vet:id,confirm:true,deleted:false},["pet"])
            return response.status(HttpStatus.OK).json(folders) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }

    @Get('/vetRequests/:id')
    async getVetRequests(@Res() response,@Param("id") id:string){
        try {
            const folders = await this.folderService.find({vet:id,confirm:false,deleted:false},["pet","pet.owner"])
            return response.status(HttpStatus.OK).json(folders) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }



    @Get(':id')
    async getSpecificFolder(@Res() response,@Param("id") id:string){
        try {
            const folders = await this.folderService.findOne({_id:id,deleted:false})
            return response.status(HttpStatus.OK).json(folders) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }


    @Get('')
    async getAllFolders(@Res() response,@Param() param){
        try {
            const folders = await this.folderService.find({deleted:false},["pet"]);
            return response.status(HttpStatus.OK).json(folders) ;
        } catch(e) {
            return response.status(HttpStatus.BAD_REQUEST).send(e) ;
        }
    }


   

    @Patch("/accept/:id")
    //  @UseGuards(JwtAuthGuard)
      async acceptFolder(@Res() response , @Param("id") id:string ){
          const result = await this.folderService.findOneAndUpdate({_id:id,deleted:false},{$set:{confirm:true}},{new:true}) ;
          return response.status(HttpStatus.OK).json(result) ;
      }

    
    @Patch("/addRapport/:id")
    //  @UseGuards(JwtAuthGuard)
      async addRapportFolder(@Res() response , @Param("id") id:string , @Body("rapport") rapport: String){
          const result = await this.folderService.findOneAndUpdate({_id:id,deleted:false},{$set:{rapport:rapport}},{new:true}) ;
          return response.status(HttpStatus.OK).json(result) ;
      }

      @Patch("/close/:id")
    //  @UseGuards(JwtAuthGuard)
      async closeFolder(@Res() response , @Param("id") id:string , @Body("rapport") rapport: String){
          const result = await this.folderService.findOneAndUpdate({_id:id,deleted:false},{$set:{status:"closed"}},{new:true}) ;
          return response.status(HttpStatus.OK).json(result) ;
      }


      @Patch("/:id")
   //  @UseGuards(JwtAuthGuard)
    async updateFolder(@Res() response , @Param("id") id:string , @Body() update: updateFolderDto){
        const result = await this.folderService.findOneAndUpdate({_id:id,deleted:false},{$set:update},{new:true}) ;
        return response.status(HttpStatus.OK).json(result) ;
    }


    @Delete("/:id")
   //& @UseGuards(JwtAuthGuard)
    async deleteFolder( @Res() response , @Param("id") id : string ) {
        const result = await this.folderService.findOneAndUpdate({_id:id},{$set:{deleted:true,deleted_At:Date.now()}},{new:true}) ; 
        return response.status(HttpStatus.OK).json(result) ; 
    }
 
}
