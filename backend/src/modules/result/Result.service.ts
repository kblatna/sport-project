import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { type PaginateModel, type PaginateResult } from 'mongoose'
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
        return await this.ResultModel
            .find()
            .lean<ResultLeanDocument[]>()
    }

    private buildStringFilter(field: string, value: string): Record<string, any> {
        return { [field]: { $regex: value, $options: 'i' } }
    }

    private buildNumberRegexFilter(field: string, value: string): Record<string, any> {
        return {
            $expr: {
                $regexMatch: {
                    input: { $toString: `$${field}` },
                    regex: value,
                    options: 'i'
                }
            }
        }
    }

    private mergeExprFilters(...exprFilters: Record<string, any>[]): Record<string, any> {
        const validFilters = exprFilters.filter(f => Object.keys(f).length > 0)
        if (validFilters.length === 0) return {}

        if (validFilters.length === 1) return validFilters[0]

        return {
            $expr: {
                $and: validFilters.map(f => f.$expr || f)
            }
        }
    }

    async paginateResults(
        pagingQuery: ListResultsQueryDto
    ): Promise<PaginateResult<ResultDocument>> {
        const filterQuery: Record<string, any> = {}

        if (pagingQuery.name) {
            Object.assign(filterQuery, this.buildStringFilter('name', pagingQuery.name))
        }
        if (pagingQuery.totalTime) {
            Object.assign(filterQuery, this.buildStringFilter('totalTime', pagingQuery.totalTime))
        }
        if (pagingQuery.category) {
            Object.assign(filterQuery, this.buildStringFilter('category', pagingQuery.category))
        }

        const numberFilters: Record<string, any>[] = []

        if (pagingQuery.rank) {
            numberFilters.push(this.buildNumberRegexFilter('rank', pagingQuery.rank))
        }
        if (pagingQuery.startNumber) {
            numberFilters.push(this.buildNumberRegexFilter('startNumber', pagingQuery.startNumber))
        }
        if (pagingQuery.dateOfBirth) {
            numberFilters.push(this.buildNumberRegexFilter('dateOfBirth', pagingQuery.dateOfBirth))
        }
        if (pagingQuery.year) {
            numberFilters.push(this.buildNumberRegexFilter('year', pagingQuery.year))
        }

        if (numberFilters.length > 0) {
            const mergedNumberFilter = this.mergeExprFilters(...numberFilters)
            Object.assign(filterQuery, mergedNumberFilter)
        }

        const options = pagingQuery.toPaginateOptions()

        return await this.ResultModel.paginate(filterQuery, options)
    }
}
