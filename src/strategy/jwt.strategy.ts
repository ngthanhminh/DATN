import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { jwtConstants } from 'src/constant/auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(private authService: AuthService) {
          super({
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               secretOrKey: jwtConstants.secret,
          });
     }

     async validate(payload: any) {
          return this.authService.validateUserJwt(payload.username);
     }
}