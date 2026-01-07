import { Controller, Get } from '@nestjs/common'
import { NavigationService } from './Navigation.service'
import { NavigationLeanDocument } from '../../databases/Navigation.schema'

@Controller('navigation')
export class NavigationController {
    constructor(private readonly navigationService: NavigationService) {}

    @Get()
    async getNavigation(): Promise<NavigationLeanDocument | null> {
        return await this.navigationService.getNavigation()
    }
}
