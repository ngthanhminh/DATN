import { Injectable } from '@nestjs/common';
import { DepartmentService } from '../departments/department.service';
import { DeviceService } from '../devices/device.service';
import { NetworkService } from '../networks/network.service';
import { SubnetService } from '../subnets/subnet.service';
import { UserService } from '../users/user.service';
import { VlanService } from '../vlans/vlan.service';

@Injectable()
export class CommonService {
     constructor(
          private readonly departmentService: DepartmentService,
          private readonly deviceService: DeviceService,
          private readonly networkService: NetworkService,
          private readonly subnetService: SubnetService,
          private readonly userService: UserService,
          private readonly vlanService: VlanService,

     ) { }

     async getCount(): Promise<any> {
          const numberDepartments = await this.departmentService.getCount();
          const numberDevices = await this.deviceService.getCount();
          const numberNetworks = await this.networkService.getCount();
          const numberSubnets = await this.subnetService.getCount();
          const numberUsers = await this.userService.getCount();
          const numberVLANs = await this.vlanService.getCount();
          return {
               numberDepartments: numberDepartments,
               numberDevices: numberDevices,
               numberNetworks: numberNetworks,
               numberSubnets: numberSubnets,
               numberUsers: numberUsers,
               numberVLANs: numberVLANs,
          }
     }

     async getLastestUser(): Promise<any> {
          return this.userService.getLastestUser();
     }
}
