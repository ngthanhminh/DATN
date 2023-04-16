import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
     constructor(private readonly commonService: CommonService) { }

     @Get('/count')
     async getCount(): Promise<any> {
          return this.commonService.getCount();
     }

     @Get('user/lastest')
     async getLastestUser(): Promise<any> {
          return this.commonService.getLastestUser();
     }
}
