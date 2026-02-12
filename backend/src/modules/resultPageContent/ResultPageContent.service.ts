import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ResultPageContent, ResultPageContentDocument } from '../../database/ResultPageContent.schema'

@Injectable()
export class ResultPageContentService {
    constructor(
        @InjectModel(ResultPageContent.name)
        private readonly resultPageContentModel: Model<ResultPageContentDocument>
    ) {}

    async getContent(): Promise<ResultPageContent | null> {
        return await this.resultPageContentModel.findOne().lean()
    }
}
