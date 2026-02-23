import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { User, UserDocument, UserLeanDocument } from '../../database/User.schema'
import { CreateUser } from './interface/CreateUser.interface'
import { ErrorException } from '../../global/Error.exception'
import { UpdateUser } from './interface/UpdateUser.interface'
import { BootstrapAdminData } from './interface/BootstrapAdmin.interface'

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

    async getUserByEmail(email: string): Promise<UserDocument | null> {
        return await this.UserModel.findOne({ email })
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

        if (!data.password) {
            throw new BadRequestException('Password is required')
        }

        const {
            username,
            name,
            email,
            password
        } = data

        const hashedPassword = await bcrypt.hash(password, 10)

        return await this.UserModel.create({
            username,
            name,
            email,
            password: hashedPassword
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

    async updateLastLogin(id: string): Promise<void> {
        await this.UserModel.findByIdAndUpdate(id, {
            lastLogin: new Date(),
            updatedAt: new Date()
        })
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    async getAdminCount(): Promise<number> {
        return await this.UserModel.countDocuments({ role: 'admin' })
    }

    async createBootstrapAdmin(data: BootstrapAdminData): Promise<UserDocument> {
        const existingUser = await this.UserModel.findOne({
            $or: [
                { email: data.email },
                { username: data.username }
            ]
        })

        if (existingUser) {
            throw new ErrorException('User with this email or username already exists', 422)
        }

        const newAdmin = await this.UserModel.create({
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'admin',
            isActive: true
        })

        this.logger.log(`Bootstrap admin created: ${data.email}`)
        return newAdmin
    }
}
