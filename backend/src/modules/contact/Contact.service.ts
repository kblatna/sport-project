import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Contact, ContactDocument } from '../../databases/Contact.schema'
import { CreateContact } from './interface/CreateContact.interface'
import { TurnstileService } from '../../integrations/turnstile/Turnstile.service'

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name)

    constructor(
        @InjectModel(Contact.name)
        private readonly contactModel: Model<ContactDocument>,
        private readonly turnstileService: TurnstileService
    ) { }

    async createContact(data: CreateContact): Promise<ContactDocument> {
        const isValid = await this.turnstileService.validateToken(data.token)
        if (!isValid) {
            throw new HttpException('Invalid Turnstile token', HttpStatus.BAD_REQUEST)
        }

        if (data.honeypot && data.honeypot.trim() !== '') {
            this.logger.warn(`Spam detected via honeypot. Email: ${data.email}`)
            throw new HttpException('Spam detected', HttpStatus.BAD_REQUEST)
        }

        const contact = new this.contactModel({
            name: data.name,
            email: data.email,
            message: data.message,
            honeypot: data.honeypot || '',
            token: data.token
        })

        return await contact.save()
    }
}
