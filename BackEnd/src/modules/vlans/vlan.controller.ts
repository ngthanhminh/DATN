import {
     Controller,
     UsePipes,
     ValidationPipe,
     Get,
     Param,
     Post,
     Body,
     Patch,
     Delete,
     Query,
} from '@nestjs/common';
import { VlanService } from './vlan.service';
import { VLAN } from 'src/entities/vlan.entity';
import { CreateVlanDto } from 'src/dtos/createVlan.dto';
import { UpdateVlanDto } from 'src/dtos/updateVlan.dto';

@UsePipes(ValidationPipe)
@Controller('vlan')
export class VlanController {
     constructor(private readonly vlanService: VlanService) { }

     @Get()
     async getAllVlans(): Promise<VLAN[]> {
          return this.vlanService.getAllVlans();
     }

     @Get('/search')
     async searchDepartment(
          @Query('keysearch') keysearch?: string,
     ): Promise<VLAN[]> {
          return this.vlanService.searchVLAN(keysearch);
     }

     @Get(':id')
     async getVlan(@Param('id') id: number): Promise<VLAN> {
          return this.vlanService.getVlanById(id);
     }

     @Post()
     async createVlan(
          @Body() vlanData: CreateVlanDto
     ): Promise<VLAN> {
          return this.vlanService.createVlan(vlanData);
     }

     @Patch(':id')
     async updateUser(
          @Param('id') id: number,
          @Body() vlanData: UpdateVlanDto
     ): Promise<VLAN> {
          return this.vlanService.updateVlan(id, vlanData);
     }

     @Delete(':id')
     async deleteUser(
          @Param('id') id: number,
     ): Promise<VLAN> {
          return this.vlanService.deleteVlan(id);
     }
}