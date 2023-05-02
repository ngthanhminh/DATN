import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { DepartmentModule } from '../departments/department.module';
import { DeviceModule } from '../devices/device.module';
import { NetworkModule } from '../networks/network.module';
import { SubnetModule } from '../subnets/subnet.module';
import { VlanModule } from '../vlans/vlan.module';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/auth.constant';

@Module({
  imports: [
    DepartmentModule,
    DeviceModule,
    NetworkModule,
    SubnetModule,
    VlanModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService]
})
export class CommonModule { }
