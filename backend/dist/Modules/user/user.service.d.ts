import { Model } from 'mongoose';
import { User, UserDocument, UserLeanDocument } from '../../Databases/user.schema';
import { CreateUserDto } from './DTO/CreateUser.dto';
export interface LocalUser {
    name: string;
    email: string;
}
export declare class UserService {
    protected readonly UserModel: Model<User>;
    protected readonly logger: any;
    constructor(UserModel: Model<User>);
    getAllUsers(): Promise<UserLeanDocument[]>;
    getUserById(id: string): Promise<UserDocument>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
