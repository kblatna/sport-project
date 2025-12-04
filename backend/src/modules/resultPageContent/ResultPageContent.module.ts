import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ResultPageContent, ResultPageContentSchema } from '../../databases/ResultPageContent.schema'
import { ResultPageContentController } from './ResultPageContent.controller'
import { ResultPageContentService } from './ResultPageContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ResultPageContent.name, schema: ResultPageContentSchema }
        ])
    ],
    controllers: [ResultPageContentController],
    providers: [ResultPageContentService],
    exports: [ResultPageContentService]
})
export class ResultPageContentModule {}
