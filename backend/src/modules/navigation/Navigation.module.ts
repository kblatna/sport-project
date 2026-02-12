import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Navigation, NavigationSchema } from '../../database/Navigation.schema'
import { NavigationController } from './Navigation.controller'
import { NavigationService } from './Navigation.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Navigation.name,
                schema: NavigationSchema
            }
        ])
    ],
    controllers: [NavigationController],
    providers: [NavigationService],
    exports: [NavigationService]
})
export class NavigationModule {}
