import * as bcrypt from 'bcryptjs';

export class PasswordFeature {

     static async hashPassword(password: string): Promise<string> {
          const saltRounds = 10; // Số vòng lặp để tạo ra salt
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(password, salt);
          return hash;
     }

     static async comparePassword(password: string, hash: string): Promise<boolean> {
          return bcrypt.compare(password, hash);
     }
}