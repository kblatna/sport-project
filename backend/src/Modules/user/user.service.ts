import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument, UserLeanDocument } from '../../Databases/user.schema'
import { CreateUser } from './Interface/CreateUser.interface'
import { ErrorException } from '../../Global/Error.exception'
import { UpdateUser } from './Interface/UpdateUser.interface'

// TODO: udělat interface pro User
export interface LocalUser {
  name: string
  email: string
}

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name)
  constructor(
    @InjectModel(User.name)
    protected readonly UserModel: Model<User>
  ) {}

  async getAllUsers(): Promise<UserLeanDocument[]> {
    return await this.UserModel.find().lean()
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.UserModel.findById(id)    
  }

  async createUser(data: CreateUser): Promise<UserDocument> {    
    const {
      name,
      email,
      createdAt = new Date(),
    } = data

    return await this.UserModel.create({
      name,
      email,
      createdAt,
    })
  }

  async updateUser(id: string, data: UpdateUser): Promise<UserDocument | null> {
    const existingUser = await this.UserModel.findById(id)
    if (!existingUser) {
      throw new ErrorException('User not found', 404)
    }
    if (data.name !== undefined) {
      existingUser.name = data.name
    }

    if (existingUser.isModified()) {
      // existingUser.updatedAt = new Date()
      await existingUser.save()
    }
    return existingUser
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.UserModel.findByIdAndDelete(id)
    if (!existingUser) {
            throw new ErrorException('User not found', 404)
        }
  }
}
