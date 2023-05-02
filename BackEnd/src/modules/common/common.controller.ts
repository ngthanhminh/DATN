import {
     Controller,
     Get,
     UseGuards,
     Request,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtAuthGuard } from 'src/guard/auth/jwtAuth.guard';

@Controller('common')
export class CommonController {
     constructor(private readonly commonService: CommonService) { }

     @UseGuards(JwtAuthGuard)
     @Get('/count')
     async getCount(
          @Request() req,
     ): Promise<any> {
          // console.log(req.user);
          return this.commonService.getCount();
     }

     @UseGuards(JwtAuthGuard)
     @Get('user/lastest')
     async getLastestUser(): Promise<any> {
          return this.commonService.getLastestUser();
     }
}
