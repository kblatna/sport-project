import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { ContactService } from './Contact.service'
import { CreateContactDto } from './dto/CreateContact.dto'
import { ContactDocument } from '../../database/Contact.schema'
import { ErrorException } from '../../global/Error.exception'

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
        try {
            return await this.contactService.createContact(createContactDto)
        } catch (error) {
            if (error instanceof ErrorException) {
                throw new BadRequestException(error.message)
            }
            throw error
        }
    }
}
