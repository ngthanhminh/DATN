import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { PasswordFeature } from 'src/features/password.feature';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  // get all user 
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (users.length == 0) {
        throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
      }
      return users;
    }
    catch (error) {
      console.log(error);
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
  }

  // get count 
  async getCount(): Promise<number> {
    return this.userRepository.count();
  }

  // get user order by createAt
  async getLastestUser(): Promise<any> {
    return this.userRepository.find({
      order: { created_at: 'DESC' },
      take: 1,
    });
  }

  // get a user with Id
  async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne(userId);
      if (!user) {
        throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
      }
      return user;
    }
    catch (error) {
      console.log(error);
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
  }


  // create user 
  async createUser(userData: CreateUserDto): Promise<Partial<User>> {
    try {
      await PasswordFeature.HashPassWord(userData.password);
      const user = await this.userRepository.save(userData);
      user.password = undefined;
      return user;
    }
    catch (error) {
      console.log(error);
      throw new HttpException(`Can't create User`, HttpStatus.NOT_FOUND);
    }
  }


  // update user
  async updateUser(userId: number, userData: UpdateUserDto): Promise<Partial<User>> {
    try {
      const user = await this.userRepository.findOne({ id: userId })
      if (user) {
        if (userData.password && PasswordFeature.ComparePassword(userData.password, user.password)) {
          await PasswordFeature.HashPassWord(userData.password);
        }
        await this.userRepository.update(userId, userData);
        const userReturn = await this.userRepository.findOne({ id: userId })
        userReturn.password = undefined;
        return userReturn;
      }
      throw new HttpException(`Can't update user`, HttpStatus.BAD_REQUEST);
    }
    catch (error) {
      console.log("Error: ", error);
      return error;
    }
  }

  // delete user
  async deleteUser(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      if (user) {
        const userD = await this.userRepository.softRemove(user);
        return userD;
      }
      throw new HttpException(`Can't delete user`, HttpStatus.BAD_REQUEST);
    }
    catch (error) {
      console.log("Error: ", error);
    }
  }
}
