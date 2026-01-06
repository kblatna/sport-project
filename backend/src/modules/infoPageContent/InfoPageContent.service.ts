import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { InfoPageContent, InfoPageContentDocument, InfoPageContentLeanDocument } from '../../databases/InfoPageContent.schema'

@Injectable()
export class InfoPageContentService {
    constructor(
        @InjectModel(InfoPageContent.name)
        private readonly infoPageContentModel: Model<InfoPageContentDocument>
    ) {}

    async getContent(): Promise<InfoPageContentLeanDocument | null> {
        return await this.infoPageContentModel.findOne().lean()
    }
}
