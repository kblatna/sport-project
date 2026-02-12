import { Controller, Get, NotFoundException } from '@nestjs/common'
import { ContactPageContentService } from './ContactPageContent.service'
import { ContactPageContentLeanDocument } from '../../database/ContactPageContent.schema'

@Controller('contact-page-content')
export class ContactPageContentController {
    constructor(private readonly service: ContactPageContentService) {}

    @Get()
    async getContent(): Promise<ContactPageContentLeanDocument> {
        const content = await this.service.getContent()
        if (!content) {
            throw new NotFoundException('Contact page content not found')
        }
        return content
    }
}
