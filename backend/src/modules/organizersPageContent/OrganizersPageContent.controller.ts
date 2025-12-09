import {
    Controller,
    Get
} from '@nestjs/common'
import { OrganizerPageContentService } from './OrganizersPageContent.service'
import { OrganizerPageContentLeanDocument } from '../../databases/OrganizersPageContent.schema'

@Controller('organizer-page-content')
export class OrganizerPageContentController {
    constructor(
        private readonly organizerPageContentService: OrganizerPageContentService
    ) {}

    @Get()
    async getContent(): Promise<OrganizerPageContentLeanDocument | null> {
        return await this.organizerPageContentService.getContent()
    }
}
