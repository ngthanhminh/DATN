import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';

export class CreateConnectionDto {
     @IsNumberString()
     device_id: number;

     @IsNumberString()
     subnet_id: number;

}
