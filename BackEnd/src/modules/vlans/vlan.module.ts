import { Module } from '@nestjs/common';
import { VlanController } from './vlan.controller';
import { VlanService } from './vlan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VLANRepository } from 'src/repositories/vlan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VLANRepository])],
  controllers: [VlanController],
  providers: [VlanService],
  exports: [VlanService],
})
export class VlanModule { }
