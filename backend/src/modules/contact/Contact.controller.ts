import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { ContactService } from './Contact.service'
import { CreateContactDto } from './dto/CreateContact.dto'
import { ContactDocument } from '../../databases/Contact.schema'

@Controller('contact')
export class ContactController {
    constructor(
        private readonly contactService: ContactService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    async createContact(
        @Body() createContactDto: CreateContactDto
    ): Promise<ContactDocument> {
        return this.contactService.createContact(createContactDto)
    }
}
