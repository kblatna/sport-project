import { Injectable } from '@nestjs/common'
import mjml2html from 'mjml'
import { CreateRaceSignup } from '../../integrations/mail/interface/CreateRaceSignup.interface'
import { MailService } from '../../integrations/mail/Mail.service'

@Injectable()
export class RaceConfirmationService {
    constructor(private readonly mailService: MailService) {}

    async sendRaceConfirmationEmail(data: CreateRaceSignup): Promise<void> {
        const html = this.generateMjml(data)

        await this.mailService.sendEmail({
            to: [data.email],
            subject: 'Potvrzení přihlášky na závod',
            html
        })
    }

    private isMjmlResult(value: unknown): value is { html: string } {
        return (
            typeof value === 'object'
            && value !== null
            && 'html' in value
            && typeof (value as { html: unknown }).html === 'string'
        )
    }

    private generateMjml(data: CreateRaceSignup): string {
        const mjml = `
      <mjml>
        <mj-body background-color="#f4f4f4" font-family="Helvetica, Arial, sans-serif">
          <mj-section background-color="#ffffff" padding="20px">
            <mj-column>
              <mj-text font-size="20px" font-weight="bold">Potvrzení přihlášky na závod</mj-text>
              <mj-divider border-color="#cccccc" />
              <mj-text font-size="16px">Dobrý den, ${data.firstName} ${data.lastName},</mj-text>
              <mj-text font-size="16px">
                děkujeme za přihlášku na Soběšickou Muldu.<br /><br />
                <strong>Jméno:</strong> ${data.firstName} ${data.lastName}<br />
                <strong>Email:</strong> ${data.email}<br />
                <strong>Kategorie:</strong> ${data.category}<br />
                <strong>Závod:</strong> ${data.race}
              </mj-text>
              <mj-text font-size="16px">
                Těšíme se na Vás na závodě!
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
        const result = mjml2html(mjml)
        if (this.isMjmlResult(result)) {
            return result.html
        }
        throw new Error('Failed to generate MJML HTML')
    }
}
