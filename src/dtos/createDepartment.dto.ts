import {
     IsNotEmpty,
     IsString,
     Matches,
     IsOptional,
     IsNumberString,
     IsEnum,
} from 'class-validator';

export class CreateDepartmentDto {
     @IsNotEmpty()
     name: string;

     @IsNotEmpty()
     location: string;

     @IsNumberString()
     user_id: number;

}
