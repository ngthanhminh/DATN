import {
     Controller,
     UsePipes,
     ValidationPipe,
     Get,
     Param,
     Post,
     Body,
     Patch,
     Delete
} from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Connection } from 'src/entities/connection.entity';
import { CreateConnectionDto } from 'src/dtos/createConnection.dto';
import { UpdateConnectionDto } from 'src/dtos/updateConnection.dto';

@UsePipes(ValidationPipe)
@Controller('connection')
export class ConnectionController {
     constructor(private readonly connectionService: ConnectionService) { }

     @Get()
     async getAllConnections(): Promise<Connection[]> {
          return this.connectionService.getAllConnections();
     }

     @Get(':id')
     async getConnection(@Param('id') id: number): Promise<Connection> {
          return this.connectionService.getConnectionById(id);
     }

     @Post()
     async createConnection(
          @Body() ConnectionData: CreateConnectionDto
     ): Promise<Connection> {
          return this.connectionService.createConnection(ConnectionData);
     }

     @Patch(':id')
     async updateConnection(
          @Param('id') id: number,
          @Body() ConnectionData: UpdateConnectionDto
     ): Promise<Connection> {
          return this.connectionService.updateConnection(id, ConnectionData);
     }

     @Delete(':id')
     async deleteConnection(
          @Param('id') id: number,
     ): Promise<Connection> {
          return this.connectionService.deleteConnection(id);
     }
}
