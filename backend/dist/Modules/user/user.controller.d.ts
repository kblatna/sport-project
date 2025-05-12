import { Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLeanDocument } from '../../Databases/user.schema';
import { CreateUserDto } from './DTO/CreateUser.dto';
export declare class UserController {
    protected readonly userService: UserService;
    protected readonly logger: Logger;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserLeanDocument[]>;
    getUserById(id: string): Promise<UserLeanDocument>;
    createUser(createUserDto: CreateUserDto): Promise<import("../../Databases/user.schema").User>;
}
