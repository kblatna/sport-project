import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { IConfig } from '../../config/configuration'

export interface SendEmailOptions {
    to: string[]
    subject: string
    html: string
}

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)
    private mg: ReturnType<Mailgun['client']>
    private readonly mailgunDomain: string
    private readonly mailgunFrom: string

    constructor(private readonly configService: ConfigService<IConfig>) {
        const mailgunApiKey = this.configService.get('mailgun.apiKey', { infer: true })
        this.mailgunDomain = this.configService.get('mailgun.domain', { infer: true }) ?? ''
        this.mailgunFrom = this.configService.get('mailgun.from', { infer: true }) ?? ''

        if (!mailgunApiKey || !this.mailgunDomain || !this.mailgunFrom) {
            this.logger.warn('Mailgun is not properly configured. Email sending will fail.')
        }

        const isEuRegion = process.env.MAILGUN_EU === 'true'
        const mailgun = new Mailgun(formData)
        this.mg = mailgun.client({
            username: 'api',
            key: mailgunApiKey ?? '',
            url: isEuRegion ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net'
        })

        this.logger.log(`Mailgun initialized with ${isEuRegion ? 'EU' : 'US'} region for domain: ${this.mailgunDomain}`)
    }

    async sendEmail(options: SendEmailOptions): Promise<void> {
        if (!this.mailgunDomain || !this.mailgunFrom) {
            throw new Error('Mailgun is not configured properly')
        }

        try {
            const response = await this.mg.messages.create(this.mailgunDomain, {
                from: this.mailgunFrom,
                to: options.to,
                subject: options.subject,
                html: options.html
            })
            this.logger.log(`Email sent successfully to ${options.to.join(', ')}. Message ID: ${response.id}`)
        } catch (error) {
            this.logger.error(`Failed to send email to ${options.to.join(', ')}`, error)
            throw error
        }
    }
}
