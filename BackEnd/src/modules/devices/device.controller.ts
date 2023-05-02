import { Controller, UsePipes, ValidationPipe, Get, Param, Body, Patch, Delete, Post, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from 'src/entities/device.entity';
import { CreateDeviceDto } from 'src/dtos/createDevice.dto';
import { UpdateDeviceDto } from 'src/dtos/updateDevice.dto';

@UsePipes(ValidationPipe)
@Controller('device')
export class DeviceController {
     constructor(private readonly deviceService: DeviceService) { }

     @Get()
     async getAllDevices(): Promise<Device[]> {
          return this.deviceService.getAllDevices();
     }

     @Get('/search')
     async searchDepartment(
          @Query('keysearch') keysearch?: string,
     ): Promise<Device[]> {
          return this.deviceService.searchDevice(keysearch);
     }

     @Get('/checkIP')
     async checkIpAddress(
          @Query('ip_address') ipAddress?: string,
     ): Promise<boolean> {
          return this.deviceService.checkIpAddress(ipAddress);
     }

     @Get(':id')
     async getDevice(@Param('id') id: number): Promise<Device> {
          return this.deviceService.getDeviceById(id);
     }

     @Post()
     async createDevice(
          @Body() deviceData: CreateDeviceDto
     ): Promise<Device> {
          return this.deviceService.createDevice(deviceData);
     }

     @Patch(':id')
     async updateDevice(
          @Param('id') id: number,
          @Body() deviceData: UpdateDeviceDto
     ): Promise<Device> {
          return this.deviceService.updateDevice(id, deviceData);
     }

     @Delete(':id')
     async deleteDevice(
          @Param('id') id: number,
     ): Promise<Device> {
          return this.deviceService.deleteDevice(id);
     }
}
