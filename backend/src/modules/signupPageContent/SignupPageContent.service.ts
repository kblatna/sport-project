import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SignupPageContent, SignupPageContentDocument, SignupPageContentLeanDocument } from '../../databases/SignupPageContent.schema'

@Injectable()
export class SignupPageContentService {
    constructor(
        @InjectModel(SignupPageContent.name)
        private readonly signupPageContentModel: Model<SignupPageContentDocument>
    ) {}

    async getContent(): Promise<SignupPageContentLeanDocument | null> {
        return await this.signupPageContentModel.findOne().lean()
    }
}
