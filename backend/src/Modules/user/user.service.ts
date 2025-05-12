import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  User,
  UserDocument,
  UserLeanDocument,
} from '../../Databases/user.schema';
import { CreateUserDto } from './DTO/CreateUser.dto';

export interface LocalUser {
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    protected readonly UserModel: Model<User>,
  ) {}

  async getAllUsers(): Promise<UserLeanDocument[]> {
    return await this.UserModel.find().lean();
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.UserModel.findById(id);
    if (!user) {
      this.logger.error(`User with id ${id} not found`);
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return await createdUser.save();
  }
}
