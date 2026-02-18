import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument, UserLeanDocument } from '../../database/User.schema'
import { CreateUser } from './interface/CreateUser.interface'
import { ErrorException } from '../../global/Error.exception'
import { UpdateUser } from './interface/UpdateUser.interface'

// TODO: create interface for User
export interface LocalUser {
    name: string
    email: string
}

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name)
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<User>
    ) { }

    async getAllUsers(): Promise<UserLeanDocument[]> {
        return await this.UserModel
            .find()
            .lean<UserLeanDocument[]>()
    }

    async getUserById(id: string): Promise<UserDocument | null> {
        return await this.UserModel.findById(id)
    }

    async getUserByUsername(username: string): Promise<UserDocument | null> {
        return await this.UserModel.findOne({ username })
    }

    async createUser(data: CreateUser): Promise<UserDocument> {
        const existingUser = await this.UserModel.findOne({
            $or: [
                { email: data.email },
                { username: data.username }
            ]
        })

        if (existingUser) {
            throw new ErrorException('User already exists', 422)
        }

        const {
            username,
            name,
            email
        } = data

        return await this.UserModel.create({
            username,
            name,
            email
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

        if (data.email !== undefined) {
            existingUser.email = data.email
        }

        if (existingUser.isModified()) {
            existingUser.updatedAt = new Date()
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
