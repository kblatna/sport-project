import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FooterContent, FooterContentDocument, FooterContentLeanDocument } from '../../database/FooterContent.schema'

@Injectable()
export class FooterContentService {
    constructor(
        @InjectModel(FooterContent.name)
        private readonly footerContentModel: Model<FooterContentDocument>
    ) {}

    async getContent(): Promise<FooterContentLeanDocument | null> {
        return await this.footerContentModel.findOne().lean()
    }
}
