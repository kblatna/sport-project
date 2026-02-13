import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { RaceApplicationDocument } from '../../database/RaceApplication.schema'
import { CreateRaceApplicationDto } from './dto/CreateRaceApplication.dto'
import { RaceApplicationService } from './RaceApplication.service'
import { ErrorException } from '../../global/Error.exception'

@Controller('race-application')
export class RaceApplicationController {
    constructor(
        private readonly raceApplicationService: RaceApplicationService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    async createRaceApplication(
        @Body() createRaceApplicationDto: CreateRaceApplicationDto
    ): Promise<RaceApplicationDocument> {
        try {
            return await this.raceApplicationService.createRaceApplication(createRaceApplicationDto)
        } catch (error) {
            if (error instanceof ErrorException) {
                throw new BadRequestException(error.message)
            }
            throw error
        }
    }
}
