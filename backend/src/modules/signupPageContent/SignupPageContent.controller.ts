import { Controller, Get } from '@nestjs/common'
import { SignupPageContentService } from './SignupPageContent.service'
import { SignupPageContentLeanDocument } from '../../databases/SignupPageContent.schema'

@Controller('signup-page-content')
export class SignupPageContentController {
    constructor(private readonly service: SignupPageContentService) {}

    @Get()
    async getContent(): Promise<SignupPageContentLeanDocument | null> {
        return await this.service.getContent()
    }
}
