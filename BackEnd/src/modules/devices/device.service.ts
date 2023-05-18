import { SubnetService } from './../subnets/subnet.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from 'src/dtos/createDevice.dto';
import { UpdateDeviceDto } from 'src/dtos/updateDevice.dto';
import { Device } from 'src/entities/device.entity';
import { DeviceRepository } from 'src/repositories/device.repository';
import { NetworkFeature } from '../../utils/network.util';

@Injectable()
export class DeviceService {
     constructor(
          private readonly deviceRepository: DeviceRepository,
          private readonly subnetService: SubnetService,
     ) { }

     // get all Device 
     async getAllDevices(): Promise<Device[]> {
          try {
               const devices = await this.deviceRepository.find({
                    relations: ['department', 'subnet'],
               });
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

     // search device
     async searchDevice(keysearch?: string): Promise<Device[]> {
          try {
               if (keysearch) {
                    var devices = await this.deviceRepository.find({
                         where: {
                              name: `${keysearch}`,
                         },
                         relations: ['department', 'subnet'],
                    })
                    return devices;
               }

               if (devices.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get count 
     async getCount(): Promise<number> {
          return this.deviceRepository.count();
     }

     // get count in a department
     async getCountInDepartment(departmentId: number): Promise<number> {
          return this.deviceRepository.count({ department_id: departmentId });
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

     // check IP address
     async checkIpAddress(ipAddress: string, departmentId: string, subnetId: string): Promise<boolean> {
          const ips = await this.subnetService.getIPAddressSubnet(Number(subnetId));
          if (!ips.includes(ipAddress)) {
               throw new HttpException(`Invalid IP address`, HttpStatus.BAD_REQUEST);
          }
          if (!NetworkFeature.isValidIPAddress(ipAddress)) {
               throw new HttpException(`Invalid IP address`, HttpStatus.BAD_REQUEST);
          }
          const device = await this.deviceRepository.findOne({
               where: {
                    ip_address: ipAddress,
               }
          });
          if (!device) {
               return false;
          }
          return true;
     }

     // create Device 
     async createDevice(deviceData: CreateDeviceDto): Promise<Device> {
          if (deviceData.ip_address) {
               const subnet = await this.subnetService.getSubnetById(deviceData.subnet_id);
               const networkFeature = new NetworkFeature();
               const ips = networkFeature.generateIPRange(NetworkFeature.getHostAddress(subnet.subnet_address), subnet.subnet_mask);
               if (!ips.includes(deviceData.ip_address)) {
                    throw new HttpException(`Ip address is not invalid`, HttpStatus.BAD_REQUEST);
               }
               const device = await this.deviceRepository.findOne({
                    where: {
                         ip_address: deviceData.ip_address,
                         mac_address: deviceData.mac_address,
                    }
               });
               if (!device) {
                    await this.deviceRepository.insert(deviceData);
                    return this.deviceRepository.findOne({
                         where: {
                              ip_address: deviceData.ip_address,
                              mac_address: deviceData.mac_address,
                         },
                         relations: ['department', 'subnet'],
                    })
               }
               throw new HttpException(`Can't create device, device already exists`, HttpStatus.BAD_REQUEST);
          }
          else {
               await this.deviceRepository.insert(deviceData);
               return this.deviceRepository.findOne({
                    where: {
                         ip_address: deviceData.ip_address,
                         mac_address: deviceData.mac_address,
                    },
                    relations: ['department', 'subnet'],
               })
          }
     }

     // update Device
     async updateDevice(deviceId: number, deviceData: UpdateDeviceDto): Promise<Device> {
          if (deviceData.ip_address) {
               if (!NetworkFeature.isValidIPAddress(deviceData.ip_address)) {
                    throw new HttpException(`Ip address is not valid`, HttpStatus.BAD_REQUEST);
               }
               const device = await this.deviceRepository.findOne({ id: deviceId })
               if (device) {
                    await this.deviceRepository.update(deviceId, deviceData);
                    return this.deviceRepository.findOne({
                         where: {
                              id: deviceId,
                         },
                         relations: ['department', 'subnet'],
                    });
               }
               throw new HttpException(`Can't update Device`, HttpStatus.BAD_REQUEST);
          }
     }

     // delete Device
     async deleteDevice(deviceId: number): Promise<Device> {
          const device = await this.deviceRepository.findOne({ id: deviceId });
          if (device) {
               const deviceD = await this.deviceRepository.softRemove(device);
               return deviceD;
          }
          throw new HttpException(`Can't delete Device`, HttpStatus.BAD_REQUEST);
     }

     // update id of device
     async updateIdOfDevice(macAddress: string, ipAddress: string): Promise<Device> {
          if (!NetworkFeature.isValidIPAddress(ipAddress)) {
               throw new HttpException(`Ip address is not valid`, HttpStatus.BAD_REQUEST);
          }
          const device = await this.deviceRepository.findOne({ mac_address: macAddress })
          if (device) {
               device.ip_address = ipAddress;
               return this.deviceRepository.save(device);
          }
          throw new HttpException(`Can't assign ip for Device`, HttpStatus.BAD_REQUEST);
     }
}
