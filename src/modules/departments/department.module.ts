import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRepository } from 'src/repositories/department.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentRepository])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule { }
