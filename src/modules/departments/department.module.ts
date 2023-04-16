import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRepository } from 'src/repositories/department.repository';
import { DeviceModule } from '../devices/device.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentRepository]),
    DeviceModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule { }
