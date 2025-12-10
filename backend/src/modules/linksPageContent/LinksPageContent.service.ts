import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LinksPageContent, LinksPageContentLeanDocument } from '../../databases/LinksPageContent.schema'

@Injectable()
export class LinksPageContentService {
    constructor(
    @InjectModel(LinksPageContent.name)
    private readonly linksPageContentModel: Model<LinksPageContent>
    ) {}

    async getContent(): Promise<LinksPageContentLeanDocument | null> {
        return this.linksPageContentModel.findOne().lean()
    }
}
