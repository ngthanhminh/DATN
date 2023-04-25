import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { PasswordFeature } from 'src/features/password.feature';
import { RoleUser } from 'src/enums/roleUser.enum';



@Injectable()
export class AuthService {
     constructor(
          private readonly userService: UserService,
          private readonly jwtService: JwtService,
     ) { }

     // generate access token
     async generateAccessToken(payload: any): Promise<string> {
          return this.jwtService.sign(payload);
     }

     // verify token 
     async verifyToken(token: string) {
          console.log(token);
          console.log(await this.jwtService.verify(token))
          return this.jwtService.verify(token);
     }

     // validate login
     async validateUser(username: string, password: string): Promise<any> {
          const user = await this.userService.getUserByUsername(username);
          if (user && PasswordFeature.ComparePassword(password, user.password)) {
               const { password, ...result } = user;
               return result;
          }
          return null;
     }

     // validate login jwt
     async validateUserJwt(username: string): Promise<any> {
          const user = await this.userService.getUserByUsername(username);
          if (user) {
               const { password, ...result } = user;
               return result;
          }
          return null;
     }

     // return access token
     async login(user: any) {
          const payload = { id: user.id, username: user.username, role: user.role };
          if (user.role == RoleUser.USER) {
               return {
                    user_token: await this.generateAccessToken(payload),
               };
          }
          else {
               return {
                    admin_token: await this.generateAccessToken(payload),
               };
          }
     }
}
