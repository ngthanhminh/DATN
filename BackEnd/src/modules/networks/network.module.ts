import { Module, forwardRef } from '@nestjs/common';
import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';
import { NetworkRepository } from 'src/repositories/network.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubnetModule } from '../subnets/subnet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NetworkRepository]),
  ],
  controllers: [NetworkController],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule { }
