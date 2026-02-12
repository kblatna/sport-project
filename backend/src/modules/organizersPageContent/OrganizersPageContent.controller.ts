import {
    Controller,
    Get,
    NotFoundException
} from '@nestjs/common'
import { OrganizerPageContentService } from './OrganizersPageContent.service'
import { OrganizerPageContentLeanDocument } from '../../database/OrganizersPageContent.schema'

@Controller('organizer-page-content')
export class OrganizerPageContentController {
    constructor(
        private readonly organizerPageContentService: OrganizerPageContentService
    ) {}

    @Get()
    async getContent(): Promise<OrganizerPageContentLeanDocument> {
        const content = await this.organizerPageContentService.getContent()
        if (!content) {
            throw new NotFoundException('Organizer page content not found')
        }
        return content
    }
}
