import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OrganizerPageContent, OrganizerPageContentSchema } from '../../databases/OrganizersPageContent.schema'
import { OrganizerPageContentController } from './OrganizersPageContent.controller'
import { OrganizerPageContentService } from './OrganizersPageContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: OrganizerPageContent.name, schema: OrganizerPageContentSchema }
        ])
    ],
    controllers: [OrganizerPageContentController],
    providers: [OrganizerPageContentService],
    exports: [OrganizerPageContentService]
})
export class OrganizerPageContentModule {}
