import {
    Injectable,
    Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Contact, ContactDocument } from '../../database/Contact.schema'
import { CreateContact } from './interface/CreateContact.interface'
import { TurnstileService } from '../../integrations/turnstile/Turnstile.service'
import { ErrorException } from '../../global/Error.exception'

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
            throw new ErrorException('Invalid Turnstile token', 400)
        }

        if (data.honeypot && data.honeypot.trim() !== '') {
            this.logger.warn(`Spam detected via honeypot. Email: ${data.email}`)
            throw new ErrorException('Spam detected', 400)
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
