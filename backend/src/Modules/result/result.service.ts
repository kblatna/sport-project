import {
    Injectable,
    Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Result, ResultDocument, ResultLeanDocument } from '../../Databases/result.schema'

@Injectable()
export class ResultService {
    protected readonly logger = new Logger(ResultService.name)

    constructor(
        @InjectModel(Result.name)
        private readonly ResultModel: Model<ResultDocument>
    ) { }

    async getAllResults(): Promise<ResultLeanDocument[]> {
        return await this.ResultModel.find().lean()
    }
}
