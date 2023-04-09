import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateConnectionDto } from 'src/dtos/createConnection.dto';
import { UpdateConnectionDto } from 'src/dtos/updateConnection.dto';
import { Connection } from 'src/entities/connection.entity';
import { ConnectionRepository } from 'src/repositories/connection.repository';

@Injectable()
export class ConnectionService {
     constructor(private readonly connectionRepository: ConnectionRepository) { }

     // get all Connection 
     async getAllConnections(): Promise<Connection[]> {
          try {
               const connections = await this.connectionRepository.find();
               if (connections.length == 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return connections;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // get a Connection with Id
     async getConnectionById(connectionId: number): Promise<Connection> {
          try {
               const connection = await this.connectionRepository.findOne(connectionId);
               if (!connection) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return connection;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // create Connection 
     async createConnection(connectionData: CreateConnectionDto): Promise<Connection> {
          try {
               return await this.connectionRepository.save(connectionData);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Can't create Connection`, HttpStatus.NOT_FOUND);
          }
     }

     // update Connection
     async updateConnection(connectionId: number, connectionData: UpdateConnectionDto): Promise<Connection> {
          try {
               const connection = await this.connectionRepository.findOne({ id: connectionId })
               if (connection) {
                    await this.connectionRepository.update(connectionId, connectionData);
                    return this.connectionRepository.findOne(connectionId);
               }
               throw new HttpException(`Can't update Connection`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

     // delete Connection
     async deleteConnection(connectionId: number): Promise<Connection> {
          try {
               const connection = await this.connectionRepository.findOne({ id: connectionId });
               if (connection) {
                    const connectionD = await this.connectionRepository.softRemove(connection);
                    return connectionD;
               }
               throw new HttpException(`Can't delete Connection`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
          }
     }

}
