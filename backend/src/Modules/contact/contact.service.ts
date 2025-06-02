import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios from 'axios'
import { Model } from 'mongoose'
import { Contact, ContactDocument } from '../../Databases/contact.schema'
import { CreateContact } from './Interface/CreateContact.interface'

@Injectable()
export class ContactService {
  protected readonly logger = new Logger(ContactService.name)

  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>
  ) {}

    async createContact(data: CreateContact): Promise<ContactDocument> {
        if (!data.name || !data.email || !data.message || !data.token) {
            throw new HttpException(
                'Missing required fields',
                HttpStatus.BAD_REQUEST
            )
        }

        const isValid = await this.validateTurnstileToken(data.token)
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


    private async validateTurnstileToken(token: string): Promise<boolean> {

        try {
            const secret = process.env.TURNSTILE_SECRET || ''
            if (!secret) {
                this.logger.error('TURNSTILE_SECRET not set in env variables')
                return false
            }

            const params = new URLSearchParams()
                params.append('secret', secret)
                params.append('response', token)

            const { data } = await axios.post(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                params.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            if (!data.success) {
                this.logger.warn('Turnstile validation failed', data)
            }

            return data.success === true
            } catch (error) {
                this.logger.error('Turnstile validation error', error)
                return false
            }
        }
}
