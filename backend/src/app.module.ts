import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import configuration from './config/configuration'
import { validationSchema, validationOptions } from './config/validation.schema'
import { UserModule } from './modules/user/User.module'
import { AuthModule } from './modules/auth/Auth.module'
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
import { NavigationModule } from './modules/navigation/Navigation.module'
import { HealthModule } from './health/health.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
            validationOptions
        }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 100
        }]),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('database.uri', { infer: true })!
            }),
            inject: [ConfigService]
        }),
        UserModule,
        AuthModule,
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
        FooterContentModule,
        NavigationModule,
        HealthModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule { }
