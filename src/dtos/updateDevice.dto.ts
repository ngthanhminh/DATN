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
import { IpType } from 'src/enums/ipType.enum';

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
     ip_type: IpType;

     @IsOptional()
     ip_expries: Date;

     @IsOptional()
     department_id: number;

     @IsOptional()
     subnet_id: number;

}
