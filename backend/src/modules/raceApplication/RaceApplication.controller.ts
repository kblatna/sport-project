import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { RaceApplicationDocument } from '../../databases/RaceApplication.schema'
import { CreateRaceApplicationDto } from './dto/CreateRaceApplication.dto'
import { RaceApplicationService } from './RaceApplication.service'

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
        return this.raceApplicationService.createRaceApplication(createRaceApplicationDto)
    }
}
