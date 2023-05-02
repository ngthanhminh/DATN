import {
     Controller,
     Post,
     UseGuards,
     Request,
     Res,
     Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guard/auth/localAuth.guard';
import { JwtAuthGuard } from 'src/guard/auth/jwtAuth.guard';

@Controller('auth')
export class AuthController {
     constructor(private readonly authService: AuthService) { }

     @UseGuards(LocalAuthGuard)
     @Post('login')
     async login(
          @Request() req,
     ) {
          return this.authService.login(req.user);
     }

     @UseGuards(JwtAuthGuard)
     @Get('profile')
     async profile(
          @Request() req,
     ) {
          return req.user;
     }
}
