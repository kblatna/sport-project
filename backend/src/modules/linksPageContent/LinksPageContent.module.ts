import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LinksPageContent, LinksPageContentSchema } from '../../databases/LinksPageContent.schema'
import { LinksPageContentService } from './LinksPageContent.service'
import { LinksPageContentController } from './LinksPageContent.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: LinksPageContent.name,
                schema: LinksPageContentSchema
            }
        ])
    ],
    providers: [LinksPageContentService],
    controllers: [LinksPageContentController]
})
export class LinksPageContentModule {}
