import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
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
    async createContact(
        @Body() createContactDto: CreateContactDto
    ): Promise<ContactDocument> {
        return this.contactService.createContact(createContactDto)
    }
}
