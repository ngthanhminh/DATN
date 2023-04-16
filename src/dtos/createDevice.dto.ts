import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';
import { IpType } from 'src/enums/ipType.enum';
import { StatusDevice } from 'src/enums/statusDevice.enum';

export class CreateDeviceDto {
     @IsNotEmpty()
     name: string;

     @IsOptional()
     decription: string;

     @IsNotEmpty()
     @IsEnum(StatusDevice)
     status: StatusDevice;

     @IsNotEmpty()
     ip_address: string;

     @IsNotEmpty()
     @IsEnum(IpType)
     ip_type: IpType;

     @IsOptional()
     ip_expries: Date;

     @IsString()
     mac_address: string;

     @IsNumberString()
     department_id: number;

     @IsNumberString()
     subnet_id: number;

}
