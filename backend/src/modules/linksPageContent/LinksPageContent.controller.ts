import { Controller, Get } from '@nestjs/common'
import { LinksPageContentService } from './LinksPageContent.service'
import { LinksPageContentLeanDocument } from '../../databases/LinksPageContent.schema'

@Controller('links-page-content')
export class LinksPageContentController {
    constructor(private readonly service: LinksPageContentService) {}

    @Get()
    async getContent(): Promise<LinksPageContentLeanDocument | null> {
        return await this.service.getContent()
    }
}
