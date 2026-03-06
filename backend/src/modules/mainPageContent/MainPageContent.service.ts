import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MainPageContent, MainPageContentDocument, MainPageContentLeanDocument } from '../../database/MainPageContent.schema'
import { ErrorException } from '../../global/Error.exception'
import { UpdateMainPageContentDto } from './dto/UpdateMainPageContent.dto'

@Injectable()
export class MainPageContentService {
    constructor(
        @InjectModel(MainPageContent.name)
        private readonly mainPageContentModel: Model<MainPageContentDocument>
    ) {}

    async getAllContent(): Promise<MainPageContentLeanDocument | null> {
        return await this.mainPageContentModel.findOne().lean()
    }

    async updateContent(id: string, data: UpdateMainPageContentDto): Promise<MainPageContentDocument | null> {
        const existingContent = await this.mainPageContentModel.findById(id)
        if (!existingContent) {
            throw new ErrorException('Main page content not found', 404)
        }

        Object.assign(existingContent, data)
        existingContent.updatedAt = new Date()

        await existingContent.save()
        return existingContent
    }
}
