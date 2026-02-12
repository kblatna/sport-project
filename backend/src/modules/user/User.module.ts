import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './User.service'
import { UserSchema } from '../../database/User.schema'
import { UserController } from './User.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User', schema: UserSchema
            }
        ])
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
