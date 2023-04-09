import {
     IsOptional,
} from 'class-validator';
import { CreateConnectionDto } from './createConnection.dto';

export class UpdateConnectionDto extends CreateConnectionDto {
     @IsOptional()
     device_id: number;

     @IsOptional()
     subnet_id: number;

}
