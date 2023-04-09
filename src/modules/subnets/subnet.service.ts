import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubnetDto } from 'src/dtos/createSubnet.dto';
import { UpdateSubnetDto } from 'src/dtos/updateSubnet.dto';
import { Subnet } from 'src/entities/subnet.entity';
import { SubnetRepository } from 'src/repositories/subnet.repository';

@Injectable()
export class SubnetService {
     constructor(private readonly subnetRepository: SubnetRepository) { }

     // get all Subnet 
     async getAllSubnets(): Promise<Subnet[]> {
          try {
               const subnets = await this.subnetRepository.find();
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

     // get a Subnet with Id
     async getSubnetById(SubnetId: number): Promise<Subnet> {
          try {
               const subnet = await this.subnetRepository.findOne(SubnetId);
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
               return await this.subnetRepository.save(subnetData);
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Can't create Subnet`, HttpStatus.NOT_FOUND);
          }
     }

     // update Subnet
     async updateSubnet(subnetId: number, subnetData: UpdateSubnetDto): Promise<Subnet> {
          try {
               const subnet = await this.subnetRepository.findOne({ id: subnetId })
               if (subnet) {
                    await this.subnetRepository.update(subnetId, subnetData);
                    return this.subnetRepository.findOne(subnetId);
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

}
