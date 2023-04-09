import { Module } from '@nestjs/common';
import { SubnetController } from './subnet.controller';
import { SubnetService } from './subnet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubnetRepository } from 'src/repositories/subnet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubnetRepository])],
  controllers: [SubnetController],
  providers: [SubnetService],
  exports: [SubnetService],
})
export class SubnetModule { }
