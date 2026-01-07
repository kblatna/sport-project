import { Controller, Get } from '@nestjs/common'
import { FooterContentService } from './FooterContent.service'
import { FooterContentLeanDocument } from '../../databases/FooterContent.schema'

@Controller('footer-content')
export class FooterContentController {
    constructor(
        private readonly footerContentService: FooterContentService
    ) {}

    @Get()
    async getContent(): Promise<FooterContentLeanDocument | null> {
        return await this.footerContentService.getContent()
    }
}
