import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
    ContactPageContent,
    ContactPageContentDocument,
    ContactPageContentLeanDocument
} from '../../databases/ContactPageContent.schema'

@Injectable()
export class ContactPageContentService {
    constructor(
        @InjectModel(ContactPageContent.name)
        private readonly model: Model<ContactPageContentDocument>
    ) {}

    async getContent(): Promise<ContactPageContentLeanDocument | null> {
        return await this.model.findOne().lean()
    }
}
