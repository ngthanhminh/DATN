import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';
import { CreateDeviceDto } from './createDevice.dto';
import { StatusDevice } from 'src/enums/statusDevice.enum';

export class UpdateDeviceDto extends CreateDeviceDto {
     @IsOptional()
     name: string;

     @IsOptional()
     status: StatusDevice;

     @IsOptional()
     ip_address: string;

     @IsOptional()
     mac_address: string;

     @IsOptional()
     department_id: number;

}
