import {
     IsOptional,
} from 'class-validator';
import { CreateNetworkDto } from './createNetwork.dto';

export class UpdateNetworkDto extends CreateNetworkDto {
     @IsOptional()
     name: string;

     @IsOptional()
     subnet_mask: string;

     @IsOptional()
     gateway: string;

     @IsOptional()
     department_id: number;

}
