import { Module } from '@nestjs/common'
import { ContactService } from './Contact.service'
import { ContactController } from './Contact.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Contact, ContactSchema } from '../../database/Contact.schema'
import { TurnstileModule } from '../../integrations/turnstile/Turnstile.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Contact.name,
                schema: ContactSchema
            }
        ]),
        TurnstileModule
    ],
    providers: [
        ContactService
    ],
    controllers: [
        ContactController
    ]
})
export class ContactModule { }
