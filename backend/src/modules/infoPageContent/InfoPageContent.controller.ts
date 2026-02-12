import {
    Controller,
    Get,
    NotFoundException
} from '@nestjs/common'
import { InfoPageContentService } from './InfoPageContent.service'
import { InfoPageContentLeanDocument } from '../../database/InfoPageContent.schema'

@Controller('info-page-content')
export class InfoPageContentController {
    constructor(
        private readonly infoPageContentService: InfoPageContentService
    ) {}

    @Get()
    async getContent(): Promise<InfoPageContentLeanDocument> {
        const content = await this.infoPageContentService.getContent()
        if (!content) {
            throw new NotFoundException('Info page content not found')
        }
        return content
    }
}
