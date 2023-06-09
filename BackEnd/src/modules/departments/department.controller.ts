import {
     Controller,
     UsePipes,
     ValidationPipe,
     Get,
     Post,
     Patch,
     Delete,
     Param,
     Body,
     Query,
     UseGuards,
     Request,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from 'src/entities/department.entity';
import { CreateDepartmentDto } from 'src/dtos/createDepartment.dto';
import { UpdateDepartmentDto } from 'src/dtos/updateDepartment.dto';
import { JwtAuthGuard } from 'src/guard/auth/jwtAuth.guard';

@UsePipes(ValidationPipe)
@Controller('department')
export class DepartmentController {
     constructor(private readonly departmentService: DepartmentService) { }

     @Get()
     async getAllDepartments(): Promise<Department[]> {
          return this.departmentService.getAllDepartments();
     }

     @Get('/search')
     async searchDepartment(
          @Query('keysearch') keysearch?: string,
     ): Promise<Department[]> {
          return this.departmentService.searchDepartment(keysearch);
     }

     @Get('/all')
     getAllInfoDepartments(): Promise<any> {
          return this.departmentService.getAllInfoDepartments();
     }

     @UseGuards(JwtAuthGuard)
     @Get('/user/')
     getAllDepartmentSubnets(
          @Request() req,
     ): Promise<any> {
          console.log(req.user);
          return this.departmentService.getAllDepartmentSubnets(req.user.id);
     }

     @Get(':id')
     async getDepartment(@Param('id') id: number): Promise<Department> {
          return this.departmentService.getDepartmentById(id);
     }

     @Get(':id/device')
     async getAllDevices(@Param('id') id: number): Promise<Department[]> {
          return this.departmentService.getAllDevices(id);
     }

     @Post()
     async createDepartment(
          @Body() DepartmentData: CreateDepartmentDto
     ): Promise<Department> {
          return this.departmentService.createDepartment(DepartmentData);
     }

     @Patch(':id')
     async updateDevice(
          @Param('id') id: number,
          @Body() deviceData: UpdateDepartmentDto
     ): Promise<Department> {
          return this.departmentService.updateDepartment(id, deviceData);
     }

     @Delete(':id')
     async deleteDevice(
          @Param('id') id: number,
     ): Promise<Department> {
          return this.departmentService.deleteDepartment(id);
     }
}
