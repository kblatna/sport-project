import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/User.module'
import { ContactModule } from './modules/contact/Contact.module'
import { RaceApplicationModule } from './modules/raceApplication/RaceApplication.module'
import { ResultModule } from './modules/result/Result.module'
import { MainPageContentModule } from './modules/mainPageContent/MainPageContent.module'
import { ResultPageContentModule } from './modules/resultPageContent/ResultPageContent.module'
import { OrganizerPageContentModule } from './modules/organizersPageContent/OrganizersPageContent.module'
import { LinksPageContentModule } from './modules/linksPageContent/LinksPageContent.module'
import { SignupPageContentModule } from './modules/signupPageContent/SignupPageContent.module'
import { ContactPageContentModule } from './modules/contactPageContent/ContactPageContent.module'
import { InfoPageContentModule } from './modules/infoPageContent/InfoPageContent.module'
import { FooterContentModule } from './modules/footerContent/FooterContent.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://root:defekt2025@mongodb:27017/mulda?authSource=admin'),
        UserModule,
        ContactModule,
        RaceApplicationModule,
        ResultModule,
        MainPageContentModule,
        ResultPageContentModule,
        OrganizerPageContentModule,
        LinksPageContentModule,
        SignupPageContentModule,
        ContactPageContentModule,
        InfoPageContentModule,
        FooterContentModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
