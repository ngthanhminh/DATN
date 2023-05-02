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
     tag: string;

     @IsOptional()
     decription: string;
}
