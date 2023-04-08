import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
} from 'class-validator';

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
     role: string;

     @IsString()
     @IsOptional()
     email: string;

     @IsString()
     @IsOptional()
     address: string;

     @IsString()
     @IsOptional()
     phone_number: string;

}
