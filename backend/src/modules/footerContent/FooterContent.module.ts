import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FooterContent, FooterContentSchema } from '../../databases/FooterContent.schema'
import { FooterContentController } from './FooterContent.controller'
import { FooterContentService } from './FooterContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: FooterContent.name,
                schema: FooterContentSchema
            }
        ])
    ],
    controllers: [FooterContentController],
    providers: [FooterContentService],
    exports: [FooterContentService]
})
export class FooterContentModule {}
