import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from 'src/dtos/createDepartment.dto';
import { UpdateDepartmentDto } from 'src/dtos/updateDepartment.dto';
import { Department } from 'src/entities/department.entity';
import { DepartmentRepository } from 'src/repositories/department.repository';

@Injectable()
export class DepartmentService {
     constructor(private readonly departmentRepository: DepartmentRepository) { }

     // get all Department 
     async getAllDepartments(): Promise<Department[]> {
          try {
               const departments = await this.departmentRepository.find();
               if (departments.length == 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return departments;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // get a Department with Id
     async getDepartmentById(DepartmentId: number): Promise<Department> {
          try {
               const department = await this.departmentRepository.findOne(DepartmentId);
               if (!department) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return department;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // create Department 
     async createDepartment(departmentData: CreateDepartmentDto): Promise<Department> {
          try {
               return await this.departmentRepository.save(departmentData);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Can't create Department`, HttpStatus.NOT_FOUND);
          }
     }

     // update Department
     async updateDepartment(departmentId: number, departmentData: UpdateDepartmentDto): Promise<Department> {
          try {
               const Department = await this.departmentRepository.findOne({ id: departmentId })
               if (Department) {
                    await this.departmentRepository.update(departmentId, departmentData);
                    return this.departmentRepository.findOne(departmentId);
               }
               throw new HttpException(`Can't update Department`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

     // delete Department
     async deleteDepartment(departmentId: number): Promise<Department> {
          try {
               const department = await this.departmentRepository.findOne({ id: departmentId });
               if (department) {
                    const departmentD = await this.departmentRepository.softRemove(department);
                    return departmentD;
               }
               throw new HttpException(`Can't delete Department`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
          }
     }


}
