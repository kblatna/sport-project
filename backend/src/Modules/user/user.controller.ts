import { Body, Controller, Delete, Get, HttpCode, HttpException, Logger, NotFoundException, Param, Patch, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDocument, UserLeanDocument } from '../../Databases/user.schema'
import { CreateUserDto } from './DTO/CreateUser.dto'
import { ErrorException } from '../../Global/Error.exception'
import { UpdateUserDto } from './DTO/UpdateUser.dto'

@Controller('users')
export class UserController {
  protected readonly logger = new Logger(UserController.name)

  constructor(
    protected readonly userService: UserService
  ) { }

  @Get()
  async getAllUsers(): Promise<UserLeanDocument[]> {
    return await this.userService.getAllUsers()
  }

  @Get('/:id')
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
  async createUser(
    @Body() body: CreateUserDto
  ): Promise<UserDocument> {
      try {
        const existingUser = await this.userService.getUserByUsername(body.username)
        if (existingUser) {
            throw new ErrorException('User already exists', 422)
        }
        return await this.userService.createUser(body)
      } catch (error) {
            if (error instanceof ErrorException) {
                throw new HttpException(error.message, error.code)
            }
        throw error
    }
}

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto
  ): Promise<UserDocument | null> {
      const user = await this.userService.getUserById(id)
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`)
      }
    try {
      return await this.userService.updateUser(id, body)

    } catch (error) {
      if (error instanceof ErrorException) {
        throw new HttpException(error.message, error.code)
      }
      throw error
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(id)
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`)
      }
      await this.userService.deleteUser(id)
    } catch (error) {
            if (error instanceof ErrorException) {
                throw new HttpException(error.message, error.code)
            }
            throw error
        }
  }
}
