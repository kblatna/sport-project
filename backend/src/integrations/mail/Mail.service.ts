import { Injectable } from '@nestjs/common'
import formData from 'form-data'
import Mailgun from 'mailgun.js'

export interface SendEmailOptions {
    to: string[]
    subject: string
    html: string
}

@Injectable()
export class MailService {
    private mg: ReturnType<Mailgun['client']>

    constructor() {
        const mailgun = new Mailgun(formData)
        this.mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY!
        })
    }

    async sendEmail(options: SendEmailOptions): Promise<void> {
        await this.mg.messages.create(process.env.MAILGUN_DOMAIN!, {
            from: process.env.MAILGUN_FROM!,
            to: options.to,
            subject: options.subject,
            html: options.html
        })
    }
}
