import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLeanDocument } from '../../Databases/user.schema';
import { CreateUserDto } from './DTO/CreateUser.dto';

@Controller('users')
export class UserController {
  protected readonly logger = new Logger(UserController.name);

  constructor(protected readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserLeanDocument[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserLeanDocument> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
