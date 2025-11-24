import { Injectable } from '@nestjs/common'
import * as mjml2html from 'mjml'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { CreateRaceSignupDto } from './dto/CreateRaceSignup.dto'

@Injectable()
export class MailService {
    private mg

    constructor() {
        const mailgun = new Mailgun(formData)
        this.mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY!
        })
    }

    async sendRaceConfirmationEmail(dto: CreateRaceSignupDto) {
        const html = this.generateMjml(dto)

        await this.mg.messages.create(process.env.MAILGUN_DOMAIN!, {
            from: process.env.MAILGUN_FROM!,
            to: [dto.email],
            subject: 'Potvrzení přihlášky na závod',
            html
        })
    }

    private generateMjml(dto: CreateRaceSignupDto): string {
        const mjml = `
      <mjml>
        <mj-body background-color="#f4f4f4" font-family="Helvetica, Arial, sans-serif">
          <mj-section background-color="#ffffff" padding="20px">
            <mj-column>
              <mj-text font-size="20px" font-weight="bold">Potvrzení přihlášky na závod</mj-text>
              <mj-divider border-color="#cccccc" />
              <mj-text font-size="16px">Dobrý den, ${dto.firstName},</mj-text>
              <mj-text font-size="16px">
                děkujeme za přihlášku.<br /><br />
                <strong>Kategorie:</strong> ${dto.lastName}<br />
                <strong>Email:</strong> ${dto.email}
              </mj-text>
              <mj-text font-size="16px">
                Závod se koná <strong>22. června v 10:00</strong> v <strong>Městském parku</strong>.
              </mj-text>
              <mj-divider border-color="#cccccc" />
              <mj-text font-size="14px" color="#999999">
                Tento e-mail byl vygenerován automaticky. Prosím, neodpovídejte na něj.
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `
        return mjml2html(mjml).html
    }
}
