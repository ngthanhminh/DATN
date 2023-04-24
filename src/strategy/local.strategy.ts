import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Dependencies } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
@Dependencies(AuthService)
export class LocalStrategy extends PassportStrategy(Strategy) {
     constructor(private authService: AuthService) {
          super();
     }

     async validate(username, password) {
          const member = await this.authService.validateUser(username, password);
          if (!member) {
               throw new UnauthorizedException();
          }
          return member;
     }
}
