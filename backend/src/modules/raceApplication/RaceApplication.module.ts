import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RaceApplication, RaceApplicationSchema } from '../../database/RaceApplication.schema'
import { RaceApplicationController } from './RaceApplication.controller'
import { RaceApplicationService } from './RaceApplication.service'
import { RaceConfirmationService } from './RaceConfirmation.service'
import { TurnstileModule } from '../../integrations/turnstile/Turnstile.module'
import { MailModule } from '../../integrations/mail/Mail.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: RaceApplication.name,
                schema: RaceApplicationSchema
            }
        ]),
        TurnstileModule,
        MailModule
    ],
    providers: [
        RaceApplicationService,
        RaceConfirmationService
    ],
    controllers: [
        RaceApplicationController
    ]
})
export class RaceApplicationModule { }
