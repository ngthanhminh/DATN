import { VLAN } from './entities/vlan.entity';
import { Subnet } from './entities/subnet.entity';
import { Device } from './entities/device.entity';
import { Department } from './entities/department.entity';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { Network } from './entities/network.entity';
import { VlanModule } from './modules/vlans/vlan.module';
import { DeviceModule } from './modules/devices/device.module';
import { DepartmentModule } from './modules/departments/department.module';
import { NetworkModule } from './modules/networks/network.module';
import { SubnetModule } from './modules/subnets/subnet.module';
import { HeaderMiddleware } from './common/middleware/header.middleware';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Department, Device, Subnet, VLAN, Network],
    }),
    UserModule,
    VlanModule,
    DeviceModule,
    DepartmentModule,
    NetworkModule,
    SubnetModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
