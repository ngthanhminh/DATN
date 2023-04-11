import {
     Controller,
     UsePipes,
     ValidationPipe,
     Get,
     Post,
     Patch,
     Delete,
     Body,
     Param,
} from '@nestjs/common';
import { NetworkService } from './network.service';
import { Network } from 'src/entities/network.entity';
import { CreateNetworkDto } from 'src/dtos/createNetwork.dto';
import { UpdateNetworkDto } from 'src/dtos/updateNetwork.dto';

@UsePipes(ValidationPipe)
@Controller('network')
export class NetworkController {
     constructor(private readonly networkService: NetworkService) { }

     @Get()
     async getAllNetworks(): Promise<Network[]> {
          return this.networkService.getAllNetworks();
     }

     @Post()
     async createNetwork(
          @Body() NetworkData: CreateNetworkDto
     ): Promise<Partial<Network>> {
          return this.networkService.createNetwork(NetworkData);
     }

     @Patch(':id')
     async updateNetwork(
          @Param('id') id: number,
          @Body() NetworkData: UpdateNetworkDto
     ): Promise<Partial<Network>> {
          return this.networkService.updateNetwork(id, NetworkData);
     }

     @Delete(':id')
     async deleteNetwork(
          @Param('id') id: number,
     ): Promise<Partial<Network>> {
          return this.networkService.deleteNetwork(id);
     }

}
