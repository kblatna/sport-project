import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './Modules/user/user.module'
import { ContactModule } from './Modules/contact/contact.module'
import { RaceConfirmationModule } from './Modules/raceConfirmation/raceConfirmation.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot('mongodb://localhost:27017'),
        UserModule,
        ContactModule,
        RaceConfirmationModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
