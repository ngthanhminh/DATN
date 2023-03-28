import { VLAN } from './entities/vlan.entity';
import { Subnet } from './entities/subnet.entity';
import { ISP } from './entities/isp.entity';
import { Device } from './entities/device.entity';
import { Department } from './entities/department.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { IPAddress } from './entities/ipAddress.entity';
import { Gateway } from './entities/gateway.entity';

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
      entities: [User, Department, Device, ISP, Subnet, VLAN, Gateway, IPAddress],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
