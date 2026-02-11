import { Controller, Get, NotFoundException } from '@nestjs/common'
import { SignupPageContentService } from './SignupPageContent.service'
import { SignupPageContentLeanDocument } from '../../databases/SignupPageContent.schema'

@Controller('signup-page-content')
export class SignupPageContentController {
    constructor(private readonly service: SignupPageContentService) {}

    @Get()
    async getContent(): Promise<SignupPageContentLeanDocument> {
        const content = await this.service.getContent()
        if (!content) {
            throw new NotFoundException('Signup page content not found')
        }
        return content
    }
}
