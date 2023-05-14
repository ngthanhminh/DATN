import { Module, forwardRef } from '@nestjs/common';
import { SubnetController } from './subnet.controller';
import { SubnetService } from './subnet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubnetRepository } from 'src/repositories/subnet.repository';
import { NetworkModule } from '../networks/network.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubnetRepository]),
    NetworkModule,
  ],
  controllers: [SubnetController],
  providers: [SubnetService],
  exports: [SubnetService],
})
export class SubnetModule { }
