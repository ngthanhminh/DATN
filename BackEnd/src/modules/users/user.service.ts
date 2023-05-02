import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from 'src/entities/user.entity';
import { RoleUser } from 'src/enums/roleUser.enum';
import { PasswordFeature } from 'src/features/password.feature';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  // get all user 
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({ where: { role: RoleUser.USER } });
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

  // search user
  async searchUser(keysearch?: string): Promise<User[]> {
    try {
      if (keysearch) {
        var user = await this.userRepository.find({
          where: {
            name: `${keysearch}`,
          },
        })
        return user;
      }

      if (user.length === 0) {
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
    return this.userRepository.count();
  }

  // get user order by createAt
  async getLastestUser(): Promise<any> {
    return this.userRepository.find({
      where: { role: RoleUser.USER },
      order: { created_at: 'DESC' },
      take: 5,
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

  // get a user with username
  async getUserByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { username: username } });
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
      const user = await this.userRepository.findOne({
        where: {
          name: userData.username,
        }
      });
      if (!user) {
        userData.password = PasswordFeature.HashPassWord(userData.password);
        await this.userRepository.insert(userData);
        return this.userRepository.findOne({
          where: {
            username: userData.username,
          },
        })
      }
      throw new HttpException(`Can't create user, Department already exists`, HttpStatus.BAD_REQUEST);
    }
    catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
