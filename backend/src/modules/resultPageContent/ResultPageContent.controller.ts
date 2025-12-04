import {
    Controller,
    Get
} from '@nestjs/common'
import { ResultPageContentService } from './ResultPageContent.service'
import { ResultPageContent } from '../../databases/ResultPageContent.schema'

@Controller('result-page-content')
export class ResultPageContentController {
    constructor(
        private readonly resultPageContentService: ResultPageContentService
    ) {}

    @Get()
    async getContent(): Promise<ResultPageContent | null> {
        return await this.resultPageContentService.getContent()
    }
}
