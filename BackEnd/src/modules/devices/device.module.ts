import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceRepository } from 'src/repositories/device.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubnetModule } from '../subnets/subnet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceRepository]),
    SubnetModule,
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule { }
