import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ContactPageContent, ContactPageContentSchema } from '../../database/ContactPageContent.schema'
import { ContactPageContentController } from './ContactPageContent.controller'
import { ContactPageContentService } from './ContactPageContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ContactPageContent.name,
                schema: ContactPageContentSchema
            }
        ])
    ],
    controllers: [ContactPageContentController],
    providers: [ContactPageContentService],
    exports: [ContactPageContentService]
})
export class ContactPageContentModule {}
