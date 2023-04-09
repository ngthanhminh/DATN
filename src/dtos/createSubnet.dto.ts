import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';

export class CreateSubnetDto {
     @IsNotEmpty()
     name: string;

     @IsOptional()
     decription: string;

     @IsNotEmpty()
     permission: string;

     @IsNumberString()
     network_id: number;

     @IsNumberString()
     vlan_id: number;

}
