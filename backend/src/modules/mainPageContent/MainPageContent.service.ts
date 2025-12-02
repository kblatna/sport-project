import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MainPageContent, MainPageContentDocument, MainPageContentLeanDocument } from '../../databases/MainPageContent.schema'

@Injectable()
export class MainPageContentService {
    constructor(
        @InjectModel(MainPageContent.name)
        private readonly mainPageContentModel: Model<MainPageContentDocument>
    ) {}

    async getAllContent(): Promise<MainPageContentLeanDocument[]> {
        return await this.mainPageContentModel.find().lean()
    }
}
