import {
     IsOptional,
} from 'class-validator';
import { CreateSubnetDto } from './createSubnet.dto';

export class UpdateSubnetDto extends CreateSubnetDto {
     @IsOptional()
     name: string;

     @IsOptional()
     decription: string;

     @IsOptional()
     permission: string;

     @IsOptional()
     network_id: number;

     @IsOptional()
     vlan_id: number;

}
