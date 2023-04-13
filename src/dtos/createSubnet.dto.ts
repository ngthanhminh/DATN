import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';

export class CreateSubnetDto {
     @IsOptional()
     name: string;

     @IsNotEmpty()
     subnet_address: string;

     @IsNotEmpty()
     subnet_mask: string;

     @IsOptional()
     decription: string;

     @IsOptional()
     permission: string;

     @IsNumberString()
     network_id: number;

     @IsOptional()
     vlan_id: number;

     @IsNumberString()
     department_id: number;

}
