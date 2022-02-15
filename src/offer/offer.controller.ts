import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { addOfferDto } from './dto/addoffer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
 
    constructor(private readonly offerService: OfferService){}
    @Post()
    // @UseGuards(JwtAuthGuard)    
    async addOffer(@Res() response,@Body() offer:addOfferDto,){
        const newOffer = await this.offerService.createOffer(offer) ;
        return response.status(HttpStatus.CREATED).json(newOffer) ;    
    }
 
}
