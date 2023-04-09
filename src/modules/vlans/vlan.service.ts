import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVlanDto } from 'src/dtos/createVlan.dto';
import { UpdateVlanDto } from 'src/dtos/updateVlan.dto';
import { VLAN } from 'src/entities/vlan.entity';
import { VLANRepository } from 'src/repositories/vlan.repository';

@Injectable()
export class VlanService {
     constructor(private readonly vlanRepository: VLANRepository) { }

     async getAllVlans(): Promise<VLAN[]> {
          try {
               const vlans = await this.vlanRepository.find();
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

     // get a user with Id
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


     // create user 
     async createVlan(vlanData: CreateVlanDto): Promise<VLAN> {
          try {
               const vlan = await this.vlanRepository.save(vlanData);
               return vlan;
          }
          catch (error) {
               console.log(error);
               throw new HttpException(`Can't create Vlan`, HttpStatus.BAD_REQUEST);
          }
     }


     // update user
     async updateVlan(vlanId: number, vlanData: UpdateVlanDto): Promise<VLAN> {
          try {
               const vlan = await this.vlanRepository.findOne({ id: vlanId })
               if (vlan) {
                    await this.vlanRepository.update(vlanId, vlanData);
                    const vlanReturn = await this.vlanRepository.findOne({ id: vlanId })
                    return vlanReturn;
               }
               throw new HttpException(`Can't update Vlan`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }

     // delete user
     async deleteVlan(vlanId: number): Promise<VLAN> {
          try {
               const vlan = await this.vlanRepository.findOne({ id: vlanId });
               if (vlan) {
                    const vlanD = await this.vlanRepository.softRemove(vlan);
                    return vlanD;
               }
               throw new HttpException(`Can't delete Vlan`, HttpStatus.BAD_REQUEST);
          }
          catch (error) {
               console.log("Error: ", error);
               return error;
          }
     }
}
