import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';
import { CreateDeviceDto } from './createDevice.dto';
import { DeviceType } from 'src/enums/deviceType.enum';

export class UpdateDeviceDto extends CreateDeviceDto {
     @IsOptional()
     name: string;

     @IsOptional()
     mac_address: string;

     @IsOptional()
     device_type: DeviceType;

     @IsOptional()
     department_id: number;

}
