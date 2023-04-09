import {
     IsEnum,
     IsOptional,
} from 'class-validator';
import { CreateUserDto } from './createUser.dto';
import { Exclude } from 'class-transformer';
import { RoleUser } from 'src/enums/roleUser.enum';

export class UpdateUserDto extends CreateUserDto {
     @IsOptional()
     name: string;

     @IsOptional()
     @Exclude()
     username: string;

     @IsOptional()
     password: string;

     @IsOptional()
     role: RoleUser;
}
