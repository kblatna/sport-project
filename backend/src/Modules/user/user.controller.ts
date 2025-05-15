import { Body, Controller, Get, Logger, NotFoundException, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDocument, UserLeanDocument } from '../../Databases/user.schema'
import { CreateUserDto } from './DTO/CreateUser.dto'

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
    return await this.userService.createUser(body)
  }
}
