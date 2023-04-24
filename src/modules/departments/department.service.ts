import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from 'src/dtos/createDepartment.dto';
import { UpdateDepartmentDto } from 'src/dtos/updateDepartment.dto';
import { Department } from 'src/entities/department.entity';
import { DepartmentRepository } from 'src/repositories/department.repository';
import { DeviceService } from '../devices/device.service';

@Injectable()
export class DepartmentService {
     constructor(
          private readonly departmentRepository: DepartmentRepository,
          private readonly deviceService: DeviceService,
     ) { }

     // get all Department 
     async getAllDepartments(): Promise<Department[]> {
          try {
               const departments = await this.departmentRepository.find();
               if (departments.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return departments;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get all device in department  
     async getAllDevices(departmentId): Promise<Department[]> {
          try {
               const departments = await this.departmentRepository.find({
                    where: {
                         id: departmentId,
                    },
                    relations: ['devices'],
               });
               if (departments.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return departments;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // search department
     async searchDepartment(keysearch?: string): Promise<Department[]> {
          try {
               if (keysearch) {
                    var departments = await this.departmentRepository.find({
                         where: {
                              name: `${keysearch}`,
                         },
                         relations: ['user', 'devices'],
                    })
                    return departments;
               }

               if (departments.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get department with all info
     async getAllInfoDepartments(): Promise<any> {
          try {
               const departments = await this.departmentRepository.find({ relations: ['user', 'devices'] });
               if (departments.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return departments;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get department [subnet]
     async getAllDepartmentSubnets(userId: number): Promise<any> {
          try {
               const departments = await this.departmentRepository.createQueryBuilder('departments')
                    .select()
                    .leftJoinAndSelect("departments.devices", "devices")
                    .leftJoinAndSelect("departments.subnets", "subnets")
                    .leftJoinAndSelect("subnets.network", "networks")
                    .leftJoinAndSelect("subnets.vlan", "vlans")
                    .leftJoinAndSelect("subnets.devices", "deviceSubnet")
                    .where('departments.user_id = :id', { id: userId })
                    .getMany();

               if (departments.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return departments;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get count  
     async getCount(): Promise<number> {
          return this.departmentRepository.count();
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
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // create Department 
     async createDepartment(departmentData: CreateDepartmentDto): Promise<Department> {
          try {
               const department = await this.departmentRepository.findOne({
                    where: {
                         name: departmentData.name,
                         location: departmentData.location,
                    }
               });
               if (!department) {
                    await this.departmentRepository.insert(departmentData);
                    return this.departmentRepository.findOne({
                         where: {
                              name: departmentData.name,
                              location: departmentData.location,
                         },
                         relations: ['user', 'devices'],
                    })
               }
               throw new HttpException(`Can't create Department, Department already exists`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
     }

     // update Department with id
     async updateDepartment(departmentId: number, departmentData: UpdateDepartmentDto): Promise<Department> {
          try {
               const Department = await this.departmentRepository.findOne({ where: { id: departmentId } })
               if (Department) {
                    await this.departmentRepository.update(departmentId, departmentData);
                    return this.departmentRepository.findOne({
                         where: {
                              id: departmentId,
                         },
                         relations: ['user', 'devices'],
                    });
               }
               throw new HttpException(`Can't update Department`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
     }

     // delete Department
     async deleteDepartment(departmentId: number): Promise<Department> {
          try {
               const department = await this.departmentRepository.findOne({ id: departmentId });
               if (department) {
                    const departmentD = await this.departmentRepository.remove(department);
                    return departmentD;
               }
               throw new HttpException(`Can't delete Department`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
     }


}
