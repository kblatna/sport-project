import { Controller, Get } from '@nestjs/common'
import { ResultService } from './result.service'
import { ResultLeanDocument } from '../../Databases/result.schema'

@Controller('results')
export class ResultController {
    constructor(
        private readonly resultService: ResultService
    ) { }

    @Get()
    async getAllResults(): Promise<ResultLeanDocument[]> {
        return await this.resultService.getAllResults()
    }
}
