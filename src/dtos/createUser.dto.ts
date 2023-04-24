import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';
import { RoleUser } from 'src/enums/roleUser.enum';

export class CreateUserDto {
     @IsNotEmpty()
     @Matches(/^[a-zA-Z0-9_\s]{3,30}$/)
     name: string;

     @IsNotEmpty()
     @Matches(/^[a-z0-9_-]{3,30}$/)
     username: string;

     @IsNotEmpty()
     @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g)
     password: string;

     @IsNotEmpty()
     @IsEnum(RoleUser)
     role: RoleUser;

     @IsOptional()
     address: string;

     @IsOptional()
     @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/g)
     email: string;

     @IsOptional()
     @Matches(/^\d{10}$/g)
     phone_number: string;

}
