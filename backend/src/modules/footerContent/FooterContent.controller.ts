import { Controller, Get, NotFoundException } from '@nestjs/common'
import { FooterContentService } from './FooterContent.service'
import { FooterContentLeanDocument } from '../../database/FooterContent.schema'

@Controller('footer-content')
export class FooterContentController {
    constructor(
        private readonly footerContentService: FooterContentService
    ) {}

    @Get()
    async getContent(): Promise<FooterContentLeanDocument> {
        const content = await this.footerContentService.getContent()
        if (!content) {
            throw new NotFoundException('Footer content not found')
        }
        return content
    }
}
