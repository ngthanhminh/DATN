import { Module } from '@nestjs/common';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionRepository } from 'src/repositories/connection.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionRepository])],
  controllers: [ConnectionController],
  providers: [ConnectionService],
  exports: [ConnectionService],
})
export class ConnectionModule { }
