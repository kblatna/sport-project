import { Controller, Get, Query } from '@nestjs/common'
import { ResultService } from './Result.service'
import type { ResultLeanDocument, ResultDocument } from '../../database/Result.schema'
import { ListResultsQueryDto } from './dto/ListResultsQuery.dto'
import { PaginateResult } from 'mongoose'

@Controller('results')
export class ResultController {
    constructor(
        private readonly resultService: ResultService
    ) { }

    @Get('paginate')
    async paginateResults(
    @Query() query: ListResultsQueryDto
    ): Promise<PaginateResult<ResultDocument>> {
        return await this.resultService.paginateResults(query)
    }

    @Get('all')
    async getAllResults(): Promise<ResultLeanDocument[]> {
        return await this.resultService.getAllResults()
    }
}
