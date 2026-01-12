import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import * as Joi from 'joi'
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
import { NavigationModule } from './modules/navigation/Navigation.module'
import { HealthModule } from './health/health.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .default('development'),
                PORT: Joi.number().default(3001),
                MONGODB_URI: Joi.string().required(),
                TURNSTILE_SECRET: Joi.string().allow('').optional(),
                MAILGUN_API_KEY: Joi.string().optional(),
                MAILGUN_DOMAIN: Joi.string().optional(),
                MAILGUN_FROM: Joi.string().optional()
            })
        }),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 100
        }]),
        MongooseModule.forRoot(process.env.MONGODB_URI!),
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
