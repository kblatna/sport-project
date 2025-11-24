import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RaceApplication, RaceApplicationSchema } from '../../databases/RaceApplication.schema'
import { RaceApplicationController } from './RaceApplication.controller'
import { RaceApplicationService } from './RaceApplication.service'

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
