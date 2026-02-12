import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MainPageContent, MainPageContentSchema } from '../../database/MainPageContent.schema'
import { MainPageContentController } from './MainPageContent.controller'
import { MainPageContentService } from './MainPageContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MainPageContent.name, schema: MainPageContentSchema }
        ])
    ],
    controllers: [MainPageContentController],
    providers: [MainPageContentService],
    exports: [MainPageContentService]
})
export class MainPageContentModule {}
