// import {
//      CanActivate,
//      ExecutionContext,
//      Injectable,
//      UnauthorizedException,
// } from '@nestjs/common';
// import { AuthService } from '../../modules/auth/auth.service';
// import { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
//      constructor(private authService: AuthService) {
//           super();
//      }

//      async canActivate(context: ExecutionContext): Promise<boolean> {
//           const request = context.switchToHttp().getRequest();
//           const token = this.extractTokenFromHeader(request);

//           if (!token) {
//                throw new UnauthorizedException('Authentication token is missing');
//           }

//           try {
//                const user = await this.authService.verifyToken(token);

//                if (!user) {
//                     throw new UnauthorizedException('Authentication token is missing');
//                }
//                request.user = user;
//                return true;
//           } catch (err) {
//                throw new UnauthorizedException('Invalid authentication token');
//           }
//      }

//      private extractTokenFromHeader(request: Request): string | null {
//           const authHeader = request.headers.authorization;
//           if (!authHeader) {
//                return null;
//           }
//           const [bearer, token] = authHeader.split(' ');

//           if (bearer !== 'Bearer' || !token) {
//                return null;
//           }
//           return token;
//      }
// }

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
