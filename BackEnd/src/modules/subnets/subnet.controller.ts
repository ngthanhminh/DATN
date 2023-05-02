import { Controller, UsePipes, ValidationPipe, Delete, Param, Body, Patch, Post, Get, Query } from '@nestjs/common';
import { SubnetService } from './subnet.service';
import { Subnet } from 'src/entities/subnet.entity';
import { CreateSubnetDto } from 'src/dtos/createSubnet.dto';
import { UpdateSubnetDto } from 'src/dtos/updateSubnet.dto';

@UsePipes(ValidationPipe)
@Controller('subnet')
export class SubnetController {
     constructor(private readonly subnetService: SubnetService) { }

     @Get()
     async getAllSubnets(): Promise<Subnet[]> {
          return this.subnetService.getAllSubnets();
     }

     @Get('/search')
     async searchDepartment(
          @Query('keysearch') keysearch?: string,
     ): Promise<Subnet[]> {
          return this.subnetService.searchSubnet(keysearch);
     }

     @Get('/available')
     async getSubnetAvailable(
     ): Promise<any> {
          return this.subnetService.getSubnetAvailable();
     }

     @Get('/department/:departmentId')
     async getSubnetInDepartment(
          @Param('departmentId') departmentId: number
     ): Promise<any> {
          return this.subnetService.getSubnetInDepartment(departmentId);
     }

     @Get('/:subnetId/ip')
     async getRandomIpInSubnet(
          @Param('subnetId') subnetId: number,
     ): Promise<any> {
          return this.subnetService.getRandomIpInSubnet(subnetId);
     }

     @Get('/:subnetId/ips')
     async getIpInSubnet(
          @Param('subnetId') subnetId: number,
     ): Promise<any> {
          return this.subnetService.getIPAddressSubnet(subnetId);
     }

     @Get('/:subnetId/device')
     async getDeviceInSubnet(
          @Param('subnetId') subnetId: number,
     ): Promise<any> {
          return this.subnetService.getDevicesInSubnet(subnetId);
     }

     @Get('/all/network/:networkId')
     async getSubnetInNetwork(
          @Param('networkId') networkId: number,
     ): Promise<any> {
          return this.subnetService.getSubnetInNetwork(networkId);
     }

     @Get('/all/vlan/:vlanId')
     async getSubnetInVlan(
          @Param('vlanId') vlanId: number,
     ): Promise<any> {
          return this.subnetService.getSubnetInVlan(vlanId);
     }

     @Get(':id')
     async getSubnet(@Param('id') id: number): Promise<Subnet> {
          return this.subnetService.getSubnetById(id);
     }

     @Post('caculate/:numSubnets')
     async caculateSubnet(
          @Param('numSubnets') numSubnets: number,
          @Body('network_address') networkAddress: string,
     ): Promise<any> {
          return this.subnetService.caculateSubnet(networkAddress, numSubnets);
     }

     @Post()
     async createSubnet(
          @Body() SubnetData: CreateSubnetDto
     ): Promise<Subnet> {
          return this.subnetService.createSubnet(SubnetData);
     }

     @Patch(':id')
     async updateSubnet(
          @Param('id') id: number,
          @Body() SubnetData: UpdateSubnetDto
     ): Promise<Subnet> {
          return this.subnetService.updateSubnet(id, SubnetData);
     }

     @Delete(':id')
     async deleteSubnet(
          @Param('id') id: number,
     ): Promise<Subnet> {
          return this.subnetService.deleteSubnet(id);
     }

}
