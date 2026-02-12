import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Navigation, NavigationDocument, NavigationLeanDocument } from '../../database/Navigation.schema'

@Injectable()
export class NavigationService {
    constructor(
        @InjectModel(Navigation.name)
        private readonly navigationModel: Model<NavigationDocument>
    ) {}

    async getNavigation(): Promise<NavigationLeanDocument | null> {
        return await this.navigationModel.findOne().lean()
    }
}
