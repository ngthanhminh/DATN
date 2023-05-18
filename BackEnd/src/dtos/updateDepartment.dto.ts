import {
     IsOptional,
} from 'class-validator';
import { CreateDepartmentDto } from './createDepartment.dto';

export class UpdateDepartmentDto extends CreateDepartmentDto {
     @IsOptional()
     name: string;

     @IsOptional()
     location: string;
}
