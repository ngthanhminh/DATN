import {
     IsOptional,
} from 'class-validator';
import { CreateSubnetDto } from './createSubnet.dto';

export class UpdateSubnetDto extends CreateSubnetDto {
     @IsOptional()
     subnet_address: string;

     @IsOptional()
     subnet_mask: string;

     @IsOptional()
     network_id: number;

     @IsOptional()
     department_id: number;

}
