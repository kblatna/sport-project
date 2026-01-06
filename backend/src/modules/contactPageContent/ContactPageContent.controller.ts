import { Controller, Get } from '@nestjs/common'
import { ContactPageContentService } from './ContactPageContent.service'
import { ContactPageContentLeanDocument } from '../../databases/ContactPageContent.schema'

@Controller('contact-page-content')
export class ContactPageContentController {
    constructor(private readonly service: ContactPageContentService) {}

    @Get()
    async getContent(): Promise<ContactPageContentLeanDocument | null> {
        return await this.service.getContent()
    }
}
