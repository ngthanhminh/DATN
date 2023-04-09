import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from 'src/dtos/createDevice.dto';
import { UpdateDeviceDto } from 'src/dtos/updateDevice.dto';
import { Device } from 'src/entities/device.entity';
import { DeviceRepository } from 'src/repositories/device.repository';

@Injectable()
export class DeviceService {
     constructor(private readonly deviceRepository: DeviceRepository) { }

     // get all Device 
     async getAllDevices(): Promise<Device[]> {
          try {
               const devices = await this.deviceRepository.find();
               if (devices.length == 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return devices;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // get a Device with Id
     async getDeviceById(deviceId: number): Promise<Device> {
          try {
               const device = await this.deviceRepository.findOne(deviceId);
               if (!Device) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return device;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // create Device 
     async createDevice(deviceData: CreateDeviceDto): Promise<Device> {
          try {
               return await this.deviceRepository.save(deviceData);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Can't create Device`, HttpStatus.NOT_FOUND);
          }
     }

     // update Device
     async updateDevice(deviceId: number, deviceData: UpdateDeviceDto): Promise<Device> {
          try {
               const device = await this.deviceRepository.findOne({ id: deviceId })
               if (device) {
                    await this.deviceRepository.update(deviceId, deviceData);
                    return this.deviceRepository.findOne(deviceId);
               }
               throw new HttpException(`Can't update Device`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

     // delete Device
     async deleteDevice(deviceId: number): Promise<Device> {
          try {
               const device = await this.deviceRepository.findOne({ id: deviceId });
               if (device) {
                    const deviceD = await this.deviceRepository.softRemove(device);
                    return deviceD;
               }
               throw new HttpException(`Can't delete Device`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
          }
     }

}
