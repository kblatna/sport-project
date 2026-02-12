import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { type FilterQuery, type PaginateModel, type PaginateResult } from 'mongoose'
import { Result, ResultDocument, ResultLeanDocument } from '../../database/Result.schema'
import { ListResultsQueryDto } from './dto/ListResultsQuery.dto'

@Injectable()
export class ResultService {
    private readonly logger = new Logger(ResultService.name)

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
        const filterQuery: FilterQuery<Result> = {}

        // Stringové filtry
        if (pagingQuery.name) {
            filterQuery.name = { $regex: pagingQuery.name, $options: 'i' }
        }
        if (pagingQuery.totalTime) {
            filterQuery.totalTime = { $regex: pagingQuery.totalTime, $options: 'i' }
        }
        if (pagingQuery.category) {
            filterQuery.category = { $regex: pagingQuery.category, $options: 'i' }
        }

        // Číselné filtry - použijeme $expr s $toString
        if (pagingQuery.rank) {
            filterQuery.$expr = {
                ...filterQuery.$expr,
                $regexMatch: {
                    input: { $toString: '$rank' },
                    regex: pagingQuery.rank,
                    options: 'i'
                }
            }
        }
        if (pagingQuery.startNumber) {
            const expr = filterQuery.$expr || {}
            filterQuery.$expr = {
                $and: [
                    ...(expr.$and || [expr].filter(e => Object.keys(e).length > 0)),
                    {
                        $regexMatch: {
                            input: { $toString: '$startNumber' },
                            regex: pagingQuery.startNumber,
                            options: 'i'
                        }
                    }
                ]
            }
        }
        if (pagingQuery.dateOfBirth) {
            const expr = filterQuery.$expr || {}
            const existing = expr.$and || [expr].filter(e => Object.keys(e).length > 0)
            filterQuery.$expr = {
                $and: [
                    ...existing,
                    {
                        $regexMatch: {
                            input: { $toString: '$dateOfBirth' },
                            regex: pagingQuery.dateOfBirth,
                            options: 'i'
                        }
                    }
                ]
            }
        }
        if (pagingQuery.year) {
            const expr = filterQuery.$expr || {}
            const existing = expr.$and || [expr].filter(e => Object.keys(e).length > 0)
            filterQuery.$expr = {
                $and: [
                    ...existing,
                    {
                        $regexMatch: {
                            input: { $toString: '$year' },
                            regex: pagingQuery.year,
                            options: 'i'
                        }
                    }
                ]
            }
        }

        const options = pagingQuery.toPaginateOptions()

        return await this.ResultModel.paginate(filterQuery, options)
    }
}
