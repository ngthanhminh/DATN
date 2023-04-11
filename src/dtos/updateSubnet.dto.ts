import {
     IsOptional,
} from 'class-validator';
import { CreateSubnetDto } from './createSubnet.dto';

export class UpdateSubnetDto extends CreateSubnetDto {
     @IsOptional()
     name: string;

     @IsOptional()
     subnet_address: string;

     @IsOptional()
     subnet_mask: string;

     @IsOptional()
     decription: string;

     @IsOptional()
     permission: string;

     @IsOptional()
     network_id: number;

     @IsOptional()
     vlan_id: number;

}
