import {
    Controller,
    Get,
    NotFoundException
} from '@nestjs/common'
import { ResultPageContentService } from './ResultPageContent.service'
import { ResultPageContent } from '../../database/ResultPageContent.schema'

@Controller('result-page-content')
export class ResultPageContentController {
    constructor(
        private readonly resultPageContentService: ResultPageContentService
    ) {}

    @Get()
    async getContent(): Promise<ResultPageContent> {
        const content = await this.resultPageContentService.getContent()
        if (!content) {
            throw new NotFoundException('Result page content not found')
        }
        return content
    }
}
