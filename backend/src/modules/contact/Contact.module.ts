import { Module } from '@nestjs/common'
import { ContactService } from './Contact.service'
import { ContactController } from './Contact.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Contact, ContactSchema } from '../../databases/Contact.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Contact.name,
                schema: ContactSchema
            }
        ])
    ],
    providers: [
        ContactService
    ],
    controllers: [
        ContactController
    ]
})
export class ContactModule { }
