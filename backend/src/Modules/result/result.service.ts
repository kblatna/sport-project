import {
    Injectable,
    Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, PaginateModel, PaginateResult, PaginateOptions } from 'mongoose'
import { Result, ResultDocument, ResultLeanDocument } from '../../Databases/result.schema'
import { ListResultsQuery } from './Interface/ListResultsQuery.interface'

@Injectable()
export class ResultService {
    protected readonly logger = new Logger(ResultService.name)

    constructor(
        @InjectModel(Result.name)
        private readonly ResultModel: PaginateModel<ResultDocument>
    ) { }

    async getAllResults(): Promise<ResultLeanDocument[]> {
        return await this.ResultModel.find().lean()
    }

    async getLeanResults(filter: ListResultsQuery, paginateOptions: PaginateOptions): Promise<PaginateResult<ResultLeanDocument>> {
        const { rank, startNumber, name, dateOfBirth, totalTime, category, year } = filter
        const filterQuery: FilterQuery<Result> = {}

        if (rank) {
            filterQuery.rank = rank
        }

        if (startNumber) {
            filterQuery.startNumber = startNumber
        }

        if (name) {
            filterQuery.name = { $regex: name, $options: 'i' } // case-insensitive
        }

        if (dateOfBirth) {
            filterQuery.dateOfBirth = dateOfBirth
        }

        if (totalTime) {
            filterQuery.totalTime = totalTime
        }

        if (category) {
            filterQuery.category = category
        }

        if (year) {
            filterQuery.year = year
        }

        return await this.ResultModel.paginate(filterQuery, {
            ...paginateOptions
        })
    }
}
