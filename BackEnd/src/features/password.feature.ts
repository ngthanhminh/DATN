import { HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';

export class PasswordFeature {
     static HashPassWord(password: string): string {
          try {
               const md5 = createHash('md5');
               const buffer = Buffer.from(password);
               return md5.update(buffer).digest('hex');
          }
          catch (error) {
               console.log(error);
               throw new HttpException('Can not encrypt password', HttpStatus.FORBIDDEN);
          }
     }

     static ComparePassword(password: string, hashPassword: string): boolean {
          return (this.HashPassWord(password) === hashPassword) ? true : false;
     }
}
