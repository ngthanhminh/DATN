import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getHello(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
}
