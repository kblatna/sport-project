import { Controller, Get, NotFoundException } from '@nestjs/common'
import { NavigationService } from './Navigation.service'
import { NavigationLeanDocument } from '../../database/Navigation.schema'

@Controller('navigation')
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {}

    @Get()
    async getNavigation(): Promise<NavigationLeanDocument> {
        const navigation = await this.navigationService.getNavigation()
        if (!navigation) {
            throw new NotFoundException('Navigation not found')
        }
        return navigation
    }
}
