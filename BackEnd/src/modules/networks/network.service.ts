import { SubnetService } from './../subnets/subnet.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateNetworkDto } from 'src/dtos/createNetwork.dto';
import { UpdateNetworkDto } from 'src/dtos/updateNetwork.dto';
import { Network } from 'src/entities/network.entity';
import { NetworkRepository } from 'src/repositories/network.repository';
import { IPv4 } from 'ipaddr.js';
import { NetworkFeature } from 'src/utils/network.util';

@Injectable()
export class NetworkService {
     constructor(
          private readonly networkRepository: NetworkRepository,
          // private readonly subnetService: SubnetService,
     ) { }

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
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get all Network avairable to caculate subnet
     async getNetworksAvailable(): Promise<Network[]> {
          try {
               let networkAvailable = [];
               const Networks = await this.networkRepository.find({
                    relations: ['subnets'],
               });
               Networks.forEach((network) => {
                    if (network.subnets.length === 0) {
                         networkAvailable.push(network);
                    }
               })
               return networkAvailable;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // search network
     async searchNetwork(keysearch?: string): Promise<Network[]> {
          try {
               if (keysearch) {
                    var networks = await this.networkRepository.find({
                         where: {
                              name: `${keysearch}`,
                         },
                    })
                    return networks;
               }

               if (networks.length === 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get count 
     async getCount(): Promise<number> {
          return this.networkRepository.count();
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
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get a Network with network address
     async getNetworkByAddress(networkAddress: string): Promise<Network> {
          try {
               const Network = await this.networkRepository.findOne({ where: { network_address: networkAddress } });
               if (!Network) {
                    throw new HttpException(`Network does not exist`, HttpStatus.NOT_FOUND);
               }
               return Network;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.NOT_FOUND);
          }
     }

     // get all network in a department 
     async getAllNetworkInDepartment(departmentId: number): Promise<Network[]> {
          try {
               const networks = await this.networkRepository
                    .createQueryBuilder('networks')
                    .innerJoin('subnets', 'subnets', 'subnets.network = networks.id')
                    .where('subnets.department_id = :departmentId', { departmentId: departmentId })
                    .getMany();
               if (networks.length === 0) {
                    throw new HttpException(`Network dose not exist in department`, HttpStatus.NOT_FOUND);
               }
               return networks;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
     }

     // check network caculated subnet ?
     async isCaculated(networkId: number): Promise<any> {
          const network = await this.networkRepository.findOne({
               where: { id: networkId },
               relations: ['subnets']
          })

          if (network.subnets.length !== 0) {
               const ipsNetwork = NetworkFeature.calculateNumIPAddresses(network.subnet_mask) + 2;
               const ipCount = NetworkFeature.calculateNumIPAddresses(network.subnets[0].subnet_mask) + 2;
               const numberSubnet = ipsNetwork / ipCount;
               return { subnet_mask: network.subnets[0].subnet_mask, number_subnet: numberSubnet, subnets: network.subnets };
          }
          return {}
     }

     // create Network 
     async createNetwork(networkData: CreateNetworkDto): Promise<Partial<Network>> {
          const network = await this.networkRepository.find({
               where: {
                    network_address: networkData.network_address
               }
          });
          if (network.length !== 0) {
               throw new HttpException(`Network existed !`, HttpStatus.BAD_REQUEST);
          }
          networkData.network_address = NetworkFeature.calculateNetworkAddress(networkData.gateway, networkData.subnet_mask);
          return await this.networkRepository.save(networkData);
     }

     // update Network
     async updateNetwork(networkId: number, networkData: UpdateNetworkDto): Promise<Partial<Network>> {
          const network = await this.networkRepository.findOne({ id: networkId })
          if (network) {
               if (networkData.gateway || networkData.subnet_mask) {
                    networkData.network_address = NetworkFeature.calculateNetworkAddress(networkData.gateway, networkData.subnet_mask);
               }
               await this.networkRepository.update(networkId, networkData);
               return this.networkRepository.findOne({ id: networkId })
          }
          throw new HttpException(`Can't update Network`, HttpStatus.BAD_REQUEST);
     }

     // delete Network
     async deleteNetwork(networkId: number): Promise<Network> {
          const network = await this.networkRepository.findOne({ id: networkId });
          if (network) {
               const networkD = await this.networkRepository.remove(network);
               return networkD;
          }
          throw new HttpException(`Can't delete Network`, HttpStatus.BAD_REQUEST);
     }

}
