import { Controller, Get, Query } from '@nestjs/common'
import { ResultService } from './result.service'
import { ResultLeanDocument } from '../../Databases/result.schema'
import { ListResultsQueryDto } from './DTO/ListResultsQuery.dto'

@Controller('results')
export class ResultController {
    constructor(
        private readonly resultService: ResultService
    ) { }

    @Get()
    async listResults(
        @Query() query: ListResultsQueryDto
    ): Promise<ResultLeanDocument[]> {
        console.log('Received query params:', query)
        return await this.resultService.getLeanResults(query)
    }

    @Get('all')
    async getAllResults(): Promise<ResultLeanDocument[]> {
        return await this.resultService.getAllResults()
    }
}
