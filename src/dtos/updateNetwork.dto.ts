import {
     IsOptional,
} from 'class-validator';

export class UpdateNetworkDto {
     @IsOptional()
     name: string;

     @IsOptional()
     ip_address: string;

     @IsOptional()
     subnet_mask: string;

     @IsOptional()
     gateway: string;

     @IsOptional()
     department_id: number;

}
