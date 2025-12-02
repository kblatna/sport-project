import {
    Controller,
    Get
} from '@nestjs/common'
import { MainPageContentService } from './MainPageContent.service'
import { MainPageContentLeanDocument } from '../../databases/MainPageContent.schema'

@Controller('main-page-content')
export class MainPageContentController {
    constructor(
        private readonly mainPageContentService: MainPageContentService
    ) {}

    @Get()
    async getAllContent(): Promise<MainPageContentLeanDocument | null> {
        return await this.mainPageContentService.getAllContent()
    }
}
