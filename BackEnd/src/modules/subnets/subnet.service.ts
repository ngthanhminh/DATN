import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubnetDto } from 'src/dtos/createSubnet.dto';
import { UpdateSubnetDto } from 'src/dtos/updateSubnet.dto';
import { Subnet } from 'src/entities/subnet.entity';
import { SubnetRepository } from 'src/repositories/subnet.repository';
import { NetworkService } from '../networks/network.service';
import { NetworkFeature } from 'src/utils/network.util';

@Injectable()
export class SubnetService {
     constructor(
          private readonly subnetRepository: SubnetRepository,
          private readonly networkService: NetworkService,
     ) { }

     // get all Subnet 
     async getAllSubnets(): Promise<Subnet[]> {
          try {
               const subnets = await this.subnetRepository.find({ relations: ['department', 'vlan', 'network'] });
               if (subnets.length == 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return subnets;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // search subnet
     async searchSubnet(keysearch?: string): Promise<Subnet[]> {
          try {
               if (keysearch) {
                    var subnets = await this.subnetRepository.find({
                         where: {
                              name: `${keysearch}`,
                         },
                         relations: ['department', 'vlan', 'network'],
                    })
                    return subnets;
               }

               if (subnets.length === 0) {
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
          return this.subnetRepository.count();
     }

     // get a Subnet with Id
     async getSubnetById(subnetId: number): Promise<Subnet> {
          try {
               const subnet = await this.subnetRepository.findOne({
                    where: {
                         id: subnetId,
                    },
                    relations: ['devices'],
               });
               if (!subnet) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return subnet;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // create Subnet 
     async createSubnet(subnetData: CreateSubnetDto): Promise<Subnet> {
          try {
               const subnet = await this.subnetRepository.findOne({
                    where: {
                         name: subnetData.name,
                         subnet_address: subnetData.subnet_address,
                    }
               });
               if (!subnet) {
                    await this.subnetRepository.insert(subnetData);
                    return this.subnetRepository.findOne({
                         where: {
                              name: subnetData.name,
                              subnet_address: subnetData.subnet_address,
                         },
                         relations: ['department', 'vlan', 'network'],
                    })
               }
               throw new HttpException(`Can't create Department, Department already exists`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
     }

     // update Subnet
     async updateSubnet(subnetId: number, subnetData: UpdateSubnetDto): Promise<Subnet> {
          try {
               const subnet = await this.subnetRepository.findOne({ id: subnetId })
               if (subnet) {
                    await this.subnetRepository.update(subnetId, subnetData);
                    return this.subnetRepository.findOne({
                         where: { id: subnetId },
                         relations: ['department', 'vlan', 'network'],
                    });
               }
               throw new HttpException(`Can't update Subnet`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

     // delete Subnet
     async deleteSubnet(subnetId: number): Promise<Subnet> {
          try {
               const subnet = await this.subnetRepository.findOne({ id: subnetId });
               if (subnet) {
                    const subnetD = await this.subnetRepository.softRemove(subnet);
                    return subnetD;
               }
               throw new HttpException(`Can't delete Subnet`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
          }
     }

     // get all subnet in Department
     async getSubnetInDepartment(departmentId: number): Promise<any> {
          try {
               // get all subnet
               const subnets = await this.subnetRepository.find({
                    where: { department_id: departmentId },
                    relations: ['network'],
               })
               return subnets;
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // get all subnet in network
     async getSubnetInNetwork(networkId: number): Promise<any> {
          try {
               // get all subnet
               const subnets = await this.subnetRepository.find({
                    where: { network_id: networkId },
                    relations: ['network', 'devices']
               })
               return subnets;
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // get all subnet in network
     async getSubnetInVlan(vlanId: number): Promise<any> {
          try {
               // get all subnet
               const subnets = await this.subnetRepository.find({
                    where: { network_id: vlanId },
                    relations: ['network', 'devices']
               })
               return subnets;
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // get all subnet in avaiable
     async getSubnetAvailable(): Promise<any> {
          try {
               // get all subnet
               const subnets = await this.subnetRepository.find({
                    where: { department_id: null },
                    // relations: ['network', 'devices']
               })
               return subnets;
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // get all ipaddress in a subnet
     async getIPAddressSubnet(subnetId: number): Promise<any> {
          try {
               const subnet = await this.getSubnetById(subnetId);
               if (subnet) {
                    const networkFeature = new NetworkFeature();
                    const ips = networkFeature.generateIPRange(NetworkFeature.getHostAddress(subnet.subnet_address), subnet.subnet_mask);
                    return ips;
               }
               throw new HttpException(`Subnet or Network does not exist`, HttpStatus.NOT_FOUND);
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // get all ipaddress in a subnet
     async getRandomIpInSubnet(subnetId: number): Promise<any> {
          try {
               const subnet = await this.getSubnetById(subnetId);
               if (subnet) {
                    const networkFeature = new NetworkFeature();
                    const ips = networkFeature.generateIPRange(NetworkFeature.getHostAddress(subnet.subnet_address), subnet.subnet_mask);
                    const randomIndex = Math.floor(Math.random() * ips.length);
                    const randomElement = ips[randomIndex];
                    return { ip: randomElement };
               }
               throw new HttpException(`Subnet or Network does not exist`, HttpStatus.NOT_FOUND);
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // get all device in a subnet
     async getDevicesInSubnet(subnetId: number): Promise<any> {
          try {
               const subnet = await this.subnetRepository.find({
                    where: {
                         id: subnetId,
                    },
                    relations: ['devices'],
               });
               if (subnet) {
                    return subnet;
               }
               throw new HttpException(`Subnet or Network does not exist`, HttpStatus.NOT_FOUND);
          }
          catch (error) {
               console.log(error);
               return error;
          }
     }

     // calculate subnet 
     async caculateSubnet(networkAddress: string, subnets: number): Promise<any> {
          try {
               const net = await this.networkService.getNetworkByAddress(networkAddress);
               if (net) {
                    // Tính số địa chỉ IP từ địa chỉ mạng
                    const numIpAddress = NetworkFeature.calcNumOfIPAddresses(networkAddress, net.subnet_mask);
                    const octets = networkAddress.split('.');
                    const subnetBits = Math.ceil(Math.log2(subnets));
                    const size = Math.pow(2, subnetBits);
                    const numberAddress = numIpAddress / size;
                    const prefixLength = 32 - Math.ceil(Math.log2(numberAddress));
                    const subnetMask = NetworkFeature.calculateSubnetMask(prefixLength);
                    const subnetsArr = [];

                    for (let i = 0; i < size; i++) {
                         const subnetOctet = i * (numIpAddress / size);
                         const subnetAddress = ((parseInt(octets[0]) << 24) | (parseInt(octets[1]) << 16) | (parseInt(octets[2]) << 8) | subnetOctet) >>> 0;
                         const subnet_address = `${subnetAddress >>> 24}.${(subnetAddress >> 16) & 255}.${(subnetAddress >> 8) & 255}.${subnetAddress & 255}/${prefixLength}`;

                         const subnet = new Subnet();
                         subnet.network_id = net.id;
                         subnet.subnet_address = subnet_address;
                         subnet.subnet_mask = subnetMask;
                         subnet.permission = 'ACCESS';

                         subnetsArr.push(subnet);
                    }

                    return this.subnetRepository.save(subnetsArr);
               }
               throw new HttpException(`Can't calculate subnet`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

}
