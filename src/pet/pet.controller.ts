import { Controller, Get } from '@nestjs/common';

@Controller('pet')
export class PetController {

    @Get('souheil')
    getHello():String{
        return "hello souheil "
    }

}
