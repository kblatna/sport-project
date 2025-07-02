import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './Modules/user/user.module'
import { ContactModule } from './Modules/contact/contact.module'
import { RaceApplicationModule } from './Modules/raceApplication/raceApplication.module'
import { ResultModule } from './Modules/result/result.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://root:defekt2025@mongodb:27017/mulda?authSource=admin'),
        UserModule,
        ContactModule,
        RaceApplicationModule,
        ResultModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
