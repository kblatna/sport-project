import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/User.module'
import { ContactModule } from './modules/contact/Contact.module'
import { RaceApplicationModule } from './modules/raceApplication/RaceApplication.module'
import { ResultModule } from './modules/result/Result.module'

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
