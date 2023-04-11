import { Controller, UsePipes, ValidationPipe, Delete, Param, Body, Patch, Post, Get } from '@nestjs/common';
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

     @Get('/department/:departmentId')
     async getSubnetInDepartment(
          @Param('departmentId') departmentId: number
     ): Promise<any> {
          return this.subnetService.getSubnetInDepartment(departmentId);
     }

     @Get('/:subnetId/ipAddress')
     async getIpInSubnet(
          @Param('subnetId') subnetId: number,
     ): Promise<any> {
          return this.subnetService.getIPAddressSubnet(subnetId);
     }

     @Get('caculate/:numSubnets')
     async caculateSubnet(
          @Param('numSubnets') numSubnets: number,
          @Body('networkAddress') networkAddress: string,
          @Body('subnetMask') subnetMask: string,
     ): Promise<any> {
          return this.subnetService.caculateSubnet(networkAddress, subnetMask, numSubnets);
     }

     @Get(':id')
     async getSubnet(@Param('id') id: number): Promise<Subnet> {
          return this.subnetService.getSubnetById(id);
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
