import { Controller, UsePipes, ValidationPipe, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from 'src/entities/department.entity';
import { CreateDepartmentDto } from 'src/dtos/createDepartment.dto';
import { UpdateDepartmentDto } from 'src/dtos/updateDepartment.dto';

@UsePipes(ValidationPipe)
@Controller('department')
export class DepartmentController {
     constructor(private readonly departmentService: DepartmentService) { }

     @Get()
     async getAllDevices(): Promise<Department[]> {
          return this.departmentService.getAllDepartments();
     }

     @Get(':id')
     async getDevice(@Param('id') id: number): Promise<Department> {
          return this.departmentService.getDepartmentById(id);
     }

     @Post()
     async createDevice(
          @Body() deviceData: CreateDepartmentDto
     ): Promise<Department> {
          return this.departmentService.createDepartment(deviceData);
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
