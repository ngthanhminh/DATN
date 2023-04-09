import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(
    @Body() userData: CreateUserDto
  ): Promise<Partial<User>> {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UpdateUserDto
  ): Promise<Partial<User>> {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
  ): Promise<Partial<User>> {
    return this.userService.deleteUser(id);
  }
}
