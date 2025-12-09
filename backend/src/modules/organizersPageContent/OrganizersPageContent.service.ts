import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { OrganizerPageContent, OrganizerPageContentDocument, OrganizerPageContentLeanDocument } from '../../databases/OrganizersPageContent.schema'

@Injectable()
export class OrganizerPageContentService {
    constructor(
        @InjectModel(OrganizerPageContent.name)
        private readonly organizerPageContentModel: Model<OrganizerPageContentDocument>
    ) {}

    async getContent(): Promise<OrganizerPageContentLeanDocument | null> {
        return await this.organizerPageContentModel.findOne().lean()
    }
}
