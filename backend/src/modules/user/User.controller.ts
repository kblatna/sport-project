import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UserService } from './User.service'
import { UserDocument, UserLeanDocument } from '../../database/User.schema'
import { CreateUserDto } from './dto/CreateUser.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/guards/roles.decorator'

@Controller('users')
export class UserController {
    private readonly logger = new Logger(UserController.name)

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async getAllUsers(): Promise<UserLeanDocument[]> {
        return await this.userService.getAllUsers()
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async getUserById(
        @Param('id') id: string
    ): Promise<UserDocument> {
        const user = await this.userService.getUserById(id)
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return user
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async createUser(
        @Body() body: CreateUserDto
    ): Promise<UserDocument> {
        return await this.userService.createUser(body)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto
    ): Promise<UserDocument | null> {
        const user = await this.userService.getUserById(id)
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return await this.userService.updateUser(id, body)
    }

    @HttpCode(204)
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async deleteUser(
        @Param('id') id: string
    ): Promise<void> {
        const user = await this.userService.getUserById(id)
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        await this.userService.deleteUser(id)
    }
}
