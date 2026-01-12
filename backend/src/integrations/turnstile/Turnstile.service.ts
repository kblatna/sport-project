import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'

interface TurnstileResponse {
    'success': boolean
    'error-codes'?: string[]
}

@Injectable()
export class TurnstileService {
    private readonly logger = new Logger(TurnstileService.name)

    async validateToken(token: string): Promise<boolean> {
        try {
            const secret = process.env.TURNSTILE_SECRET
            if (typeof secret !== 'string' || secret.trim() === '') {
                this.logger.error('TURNSTILE_SECRET not set in env variables')
                return false
            }

            const params = new URLSearchParams()
            params.append('secret', secret)
            params.append('response', token)

            const { data } = await axios.post<TurnstileResponse>(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                params.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )

            if (data.success !== true) {
                this.logger.warn('Turnstile validation failed', data)
            }

            return data.success === true
        } catch (error) {
            this.logger.error('Turnstile validation error', error)
            return false
        }
    }
}
