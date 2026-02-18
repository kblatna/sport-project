import { Controller, Get, Query } from '@nestjs/common'
import { ResultService } from './Result.service'
import type { ResultDocument } from '../../database/Result.schema'
import { ListResultsQueryDto } from './dto/ListResultsQuery.dto'
import { PaginateResult } from 'mongoose'

@Controller('results')
export class ResultController {
    constructor(
        private readonly resultService: ResultService
    ) { }

    @Get()
    async getResults(
        @Query() query: ListResultsQueryDto
    ): Promise<PaginateResult<ResultDocument>> {
        return await this.resultService.getResults(query)
    }
}
