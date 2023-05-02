import { Optional } from '@nestjs/common';
import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
} from 'class-validator';
import { CreateVlanDto } from './createVlan.dto';

export class UpdateVlanDto extends CreateVlanDto {
     @IsOptional()
     name: string;

     @IsOptional()
     tag: string;

     @IsOptional()
     department_id: number;

}
