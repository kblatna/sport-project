import { Controller, Get, NotFoundException } from '@nestjs/common'
import { LinksPageContentService } from './LinksPageContent.service'
import { LinksPageContentLeanDocument } from '../../databases/LinksPageContent.schema'

@Controller('links-page-content')
export class LinksPageContentController {
    constructor(private readonly service: LinksPageContentService) {}

    @Get()
    async getContent(): Promise<LinksPageContentLeanDocument> {
        const content = await this.service.getContent()
        if (!content) {
            throw new NotFoundException('Links page content not found')
        }
        return content
    }
}
