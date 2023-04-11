import { Exclude } from 'class-transformer';
import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';
import { StatusDevice } from 'src/enums/statusDevice.enum';

export class CreateNetworkDto {
     @IsNotEmpty()
     name: string;

     @Exclude()
     network_address: string;

     @IsNotEmpty()
     subnet_mask: string;

     @IsNotEmpty()
     gateway: string;

     @IsOptional()
     decription: string;

     @IsNumberString()
     department_id: number;

}
