import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SignupPageContent, SignupPageContentSchema } from '../../databases/SignupPageContent.schema'
import { SignupPageContentController } from './SignupPageContent.controller'
import { SignupPageContentService } from './SignupPageContent.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: SignupPageContent.name,
                schema: SignupPageContentSchema
            }
        ])
    ],
    providers: [SignupPageContentService],
    controllers: [SignupPageContentController]
})
export class SignupPageContentModule {}
