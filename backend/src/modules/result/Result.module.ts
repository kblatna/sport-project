import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ResultService } from './Result.service'
import { ResultController } from './Result.controller'
import { Result, ResultSchema } from '../../database/Result.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Result.name,
                schema: ResultSchema
            }
        ])
    ],
    providers: [
        ResultService
    ],
    controllers: [
        ResultController
    ]
})
export class ResultModule { }
