import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RaceConfirmation, RaceConfirmationSchema } from '../../Databases/raceConfirmation.schema'
import { RaceConfirmationController } from './raceConfirmation.controller'
import { RaceConfirmationService } from './raceConfirmation.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: RaceConfirmation.name,
                schema: RaceConfirmationSchema
            }
        ])
    ],
    providers: [
        RaceConfirmationService
    ],
    controllers: [
        RaceConfirmationController
    ],
})
export class RaceConfirmationModule { }
