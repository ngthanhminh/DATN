import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVlanDto } from 'src/dtos/createVlan.dto';
import { UpdateVlanDto } from 'src/dtos/updateVlan.dto';
import { VLAN } from 'src/entities/vlan.entity';
import { VLANRepository } from 'src/repositories/vlan.repository';

@Injectable()
export class VlanService {
     constructor(private readonly vlanRepository: VLANRepository) { }

     // get all vlan
     async getAllVlans(): Promise<VLAN[]> {
          try {
               const vlans = await this.vlanRepository.find({ relations: ['subnets'] });
               if (vlans.length == 0) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return vlans;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }

     // search VLAN
     async searchVLAN(keysearch?: string): Promise<VLAN[]> {
          try {
               if (keysearch) {
                    var VLANs = await this.vlanRepository.find({
                         where: {
                              name: `${keysearch}`,
                         },
                         relations: ['subnets'],
                    })
                    return VLANs;
               }

               if (VLANs.length === 0) {
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
          return this.vlanRepository.count();
     }

     // get a VLAN with Id
     async getVlanById(vlanId: number): Promise<VLAN> {
          try {
               const vlan = await this.vlanRepository.findOne(vlanId);
               if (!vlan) {
                    throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
               }
               return vlan;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
          }
     }


     // create VLAN 
     async createVlan(vlanData: CreateVlanDto): Promise<VLAN> {
          const vlan = await this.vlanRepository.findOne({
               where: {
                    name: vlanData.name,
                    tag: vlanData.tag,
               }
          });
          if (!vlan) {
               await this.vlanRepository.insert(vlanData);
               return this.vlanRepository.findOne({
                    where: {
                         name: vlanData.name,
                         tag: vlanData.tag,
                    },
                    relations: ['subnets'],
               })
          }
          throw new HttpException(`Can't create VLAN, VLAN already exists`, HttpStatus.BAD_REQUEST);
     }


     // update VLAN
     async updateVlan(vlanId: number, vlanData: UpdateVlanDto): Promise<VLAN> {
          const vlan = await this.vlanRepository.findOne({ id: vlanId })
          if (vlan) {
               await this.vlanRepository.update(vlanId, vlanData);
               const vlanReturn = await this.vlanRepository.findOne({
                    where: { id: vlanId },
                    relations: ['subnets'],
               })
               return vlanReturn;
          }
          throw new HttpException(`Can't update Vlan`, HttpStatus.BAD_REQUEST);
     }

     // delete VLAN
     async deleteVlan(vlanId: number): Promise<VLAN> {
          const vlan = await this.vlanRepository.findOne({ id: vlanId });
          if (vlan) {
               const vlanD = await this.vlanRepository.softRemove(vlan);
               return vlanD;
          }
          throw new HttpException(`Can't delete Vlan`, HttpStatus.BAD_REQUEST);
     }
}