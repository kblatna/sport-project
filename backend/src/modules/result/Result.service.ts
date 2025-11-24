import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { type FilterQuery, type PaginateModel, type PaginateResult } from 'mongoose'
import { Result, ResultDocument, ResultLeanDocument } from '../../databases/Result.schema'
import { ListResultsQueryDto } from './dto/ListResultsQuery.dto' // doporučuji DTO, ne interface
import { buildFilterQuery, FilterConfig } from '../../global/BuildFilterQuery' // upravte cestu podle vašeho projektu

@Injectable()
export class ResultService {
    protected readonly logger = new Logger(ResultService.name)

    constructor(
    @InjectModel(Result.name)
    private readonly ResultModel: PaginateModel<ResultDocument>
    ) {}

    async getAllResults(): Promise<ResultLeanDocument[]> {
        return await this.ResultModel.find().lean()
    }

    async paginateResults(
        pagingQuery: ListResultsQueryDto
    ): Promise<PaginateResult<ResultDocument>> {
        const filterConfig: FilterConfig<Result> = {
            rank: { type: 'exact' },
            startNumber: { type: 'exact' },
            name: { type: 'regex' },
            dateOfBirth: { type: 'exact' },
            totalTime: { type: 'exact' },
            category: { type: 'exact' },
            year: { type: 'exact' }
        }

        const filterQuery: FilterQuery<Result> = buildFilterQuery<Result>(pagingQuery, filterConfig)

        const options = pagingQuery.toPaginateOptions()

        return await this.ResultModel.paginate(filterQuery, options)
    }
}
