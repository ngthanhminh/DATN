import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { DepartmentModule } from '../departments/department.module';
import { DeviceModule } from '../devices/device.module';
import { NetworkModule } from '../networks/network.module';
import { SubnetModule } from '../subnets/subnet.module';
import { VlanModule } from '../vlans/vlan.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    DepartmentModule,
    DeviceModule,
    NetworkModule,
    SubnetModule,
    VlanModule,
    UserModule,
  ],
  controllers: [CommonController],
  providers: [CommonService]
})
export class CommonModule { }
