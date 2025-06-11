import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { RaceApplicationDocument } from '../../Databases/raceApplication.schema'
import { CreateRaceApplicationDto } from './DTO/CreateRaceApplication.dto'
import { RaceApplicationService } from './raceApplication.service'

@Controller('race-Application')
export class RaceApplicationController {
    constructor(
        private readonly raceApplicationService: RaceApplicationService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createRaceApplication(
        @Body() createRaceApplicationDto: CreateRaceApplicationDto
    ): Promise<RaceApplicationDocument> {
        return this.raceApplicationService.createRaceApplication(createRaceApplicationDto)
    }
}
