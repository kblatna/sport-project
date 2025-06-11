import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RaceApplication, RaceApplicationSchema } from '../../Databases/raceApplication.schema'
import { RaceApplicationController } from './raceApplication.controller'
import { RaceApplicationService } from './raceApplication.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: RaceApplication.name,
                schema: RaceApplicationSchema
            }
        ])
    ],
    providers: [
        RaceApplicationService
    ],
    controllers: [
        RaceApplicationController
    ]
})
export class RaceApplicationModule { }
