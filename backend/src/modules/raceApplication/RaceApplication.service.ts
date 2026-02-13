import {
    Injectable,
    Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RaceApplication, RaceApplicationDocument } from '../../database/RaceApplication.schema'
import { CreateRaceApplication } from './interface/CreateRaceApplication.interface'
import { TurnstileService } from '../../integrations/turnstile/Turnstile.service'
import { ErrorException } from '../../global/Error.exception'

@Injectable()
export class RaceApplicationService {
    private readonly logger = new Logger(RaceApplicationService.name)

    constructor(
        @InjectModel(RaceApplication.name)
        private readonly raceApplicationModel: Model<RaceApplicationDocument>,
        private readonly turnstileService: TurnstileService
    ) { }

    async createRaceApplication(data: CreateRaceApplication): Promise<RaceApplicationDocument> {
        const isValid = await this.turnstileService.validateToken(data.token)
        if (!isValid) {
            throw new ErrorException('Invalid Turnstile token', 400)
        }

        if (data.honeypot && data.honeypot.trim() !== '') {
            this.logger.warn(`Spam detected via honeypot. Email: ${data.email}`)
            throw new ErrorException('Spam detected', 400)
        }

        const raceApplication = new this.raceApplicationModel({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: new Date(data.dateOfBirth),
            category: data.category,
            race: data.race,
            note: data.note || '',
            honeypot: data.honeypot || '',
            token: data.token
        })

        return await raceApplication.save()
    }
}
