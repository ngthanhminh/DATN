import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNetworkDto } from 'src/dtos/createNetwork.dto';
import { UpdateNetworkDto } from 'src/dtos/updateNetwork.dto';
import { Network } from 'src/entities/network.entity';
import { NetworkRepository } from 'src/repositories/network.repository';

@Injectable()
export class NetworkService {
     constructor(private readonly networkRepository: NetworkRepository) { }

     // get all Network 
     async getAllNetworks(): Promise<Network[]> {
          try {
               const Networks = await this.networkRepository.find();
               if (Networks.length == 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return Networks;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // get a Network with Id
     async getNetworkById(NetworkId: number): Promise<Network> {
          try {
               const Network = await this.networkRepository.findOne(NetworkId);
               if (!Network) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return Network;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }


     // create Network 
     async createNetwork(networkData: CreateNetworkDto): Promise<Partial<Network>> {
          try {
               return await this.networkRepository.save(networkData);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Can't create Device`, HttpStatus.NOT_FOUND);
          }
     }


     // update Network
     async updateNetwork(networkId: number, networkData: UpdateNetworkDto): Promise<Partial<Network>> {
          try {
               const network = await this.networkRepository.findOne({ id: networkId })
               if (network) {
                    await this.networkRepository.update(networkId, networkData);
                    return this.networkRepository.findOne({ id: networkId })
               }
               throw new HttpException(`Can't update Network`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

     // delete Network
     async deleteNetwork(networkId: number): Promise<Network> {
          try {
               const network = await this.networkRepository.findOne({ id: networkId });
               if (network) {
                    const networkD = await this.networkRepository.softRemove(network);
                    return networkD;
               }
               throw new HttpException(`Can't delete Network`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
          }
     }
}