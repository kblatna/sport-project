import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RaceApplication, RaceApplicationSchema } from '../../database/RaceApplication.schema'
import { RaceApplicationController } from './RaceApplication.controller'
import { RaceApplicationService } from './RaceApplication.service'
import { TurnstileModule } from '../../integrations/turnstile/Turnstile.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: RaceApplication.name,
                schema: RaceApplicationSchema
            }
        ]),
        TurnstileModule
    ],
    providers: [
        RaceApplicationService
    ],
    controllers: [
        RaceApplicationController
    ]
})
export class RaceApplicationModule { }
