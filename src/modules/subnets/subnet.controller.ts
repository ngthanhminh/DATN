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
