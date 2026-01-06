import {
    Controller,
    Get
} from '@nestjs/common'
import { InfoPageContentService } from './InfoPageContent.service'
import { InfoPageContentLeanDocument } from '../../databases/InfoPageContent.schema'

@Controller('info-page-content')
export class InfoPageContentController {
    constructor(
        private readonly infoPageContentService: InfoPageContentService
    ) {}

    @Get()
    async getContent(): Promise<InfoPageContentLeanDocument | null> {
        return await this.infoPageContentService.getContent()
    }
}
