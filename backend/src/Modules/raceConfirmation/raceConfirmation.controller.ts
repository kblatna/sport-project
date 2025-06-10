import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RaceConfirmationDocument } from '../../Databases/raceConfirmation.schema'
import { CreateRaceConfirmationDto } from './DTO/CreateRaceConfirmation.dto'
import { RaceConfirmationService } from './raceConfirmation.service'

@Controller('race-confirmation')
export class RaceConfirmationController {
    constructor(
        private readonly raceConfirmationService: RaceConfirmationService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createRaceConfirmation(
        @Body() createRaceConfirmationDto: CreateRaceConfirmationDto
    ): Promise<RaceConfirmationDocument> {
        return this.raceConfirmationService.createRaceConfirmation(createRaceConfirmationDto)
    }
}
