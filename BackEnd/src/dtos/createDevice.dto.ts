import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';
import { DeviceType } from 'src/enums/deviceType.enum';

export class CreateDeviceDto {
     @IsNotEmpty()
     name: string;

     @IsOptional()
     decription: string;

     @IsOptional()
     ip_address: string;

     @IsNotEmpty()
     @IsEnum(DeviceType)
     device_type: DeviceType;

     @IsString()
     mac_address: string;

     @IsNumberString()
     department_id: number;

     @IsOptional()
     subnet_id: number;

}
