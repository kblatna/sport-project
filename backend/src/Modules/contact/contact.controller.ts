import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './DTO/CreateContact.dto'
import { ContactDocument } from '../../Databases/contact.schema'

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
