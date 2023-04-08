import { Optional } from '@nestjs/common';
import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
} from 'class-validator';

export class CreateVlanDto {
     @IsNotEmpty()
     @Matches(/^[a-zA-Z0-9_\s]{3,30}$/)
     name: string;

     @IsNotEmpty()
     code: string;

     @IsOptional()
     decription: string;

     @IsNotEmpty()
     tag: string;

     @IsNotEmpty()
     department_id: string;

     @IsString()
     @IsOptional()
     address: string;

     @IsString()
     @IsOptional()
     phone_number: string;

}
