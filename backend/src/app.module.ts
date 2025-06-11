import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './Modules/user/user.module'
import { ContactModule } from './Modules/contact/contact.module'
import { RaceApplicationModule } from './Modules/raceApplication/raceApplication.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://localhost:27017'),
        UserModule,
        ContactModule,
        RaceApplicationModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
