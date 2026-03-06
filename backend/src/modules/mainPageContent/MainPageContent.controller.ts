import {
    Controller,
    Get,
    Patch,
    Body,
    Param,
    NotFoundException,
    UseGuards
} from '@nestjs/common'
import { MainPageContentService } from './MainPageContent.service'
import { MainPageContentLeanDocument, MainPageContentDocument } from '../../database/MainPageContent.schema'
import { UpdateMainPageContentDto } from './dto/UpdateMainPageContent.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/guards/roles.decorator'

@Controller('main-page-content')
export class MainPageContentController {
    constructor(
        private readonly mainPageContentService: MainPageContentService
    ) {}

    @Get()
    async getAllContent(): Promise<MainPageContentLeanDocument> {
        const content = await this.mainPageContentService.getAllContent()
        if (!content) {
            throw new NotFoundException('Main page content not found')
        }
        return content
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async updateContent(
        @Param('id') id: string,
        @Body() body: UpdateMainPageContentDto
    ): Promise<MainPageContentDocument | null> {
        const content = await this.mainPageContentService.updateContent(id, body)
        if (!content) {
            throw new NotFoundException(`Main page content with id ${id} not found`)
        }
        return content
    }
}
