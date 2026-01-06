import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { InfoPageContent, InfoPageContentSchema } from '../../databases/InfoPageContent.schema'
import { InfoPageContentController } from './InfoPageContent.controller'
import { InfoPageContentService } from './InfoPageContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: InfoPageContent.name,
                schema: InfoPageContentSchema
            }
        ])
    ],
    controllers: [InfoPageContentController],
    providers: [InfoPageContentService],
    exports: [InfoPageContentService]
})
export class InfoPageContentModule {}
