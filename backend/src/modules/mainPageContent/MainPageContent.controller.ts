import {
    Controller,
    Get,
    NotFoundException
} from '@nestjs/common'
import { MainPageContentService } from './MainPageContent.service'
import { MainPageContentLeanDocument } from '../../databases/MainPageContent.schema'

@Controller('main-page-content')
export class MainPageContentController {
    constructor(
        private readonly mainPageContentService: MainPageContentService
    ) {}

    @Get()
    async getAllContent(): Promise<MainPageContentLeanDocument> {
        const content = await this.mainPageContentService.getAllContent()
        if (!content) {
            throw new NotFoundException('Main page content not found')
        }
        return content
    }
}
