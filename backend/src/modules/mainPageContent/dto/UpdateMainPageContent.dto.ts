import { Exclude, Expose, Type } from 'class-transformer'
import {
    IsOptional,
    IsString,
    IsBoolean,
    IsArray,
    ValidateNested,
    IsEnum
} from 'class-validator'

@Exclude()
class ButtonItemDto {
    @IsOptional()
    @IsString()
    @Expose()
    label?: string

    @IsOptional()
    @IsString()
    @Expose()
    link?: string

    @IsOptional()
    @IsString()
    @Expose()
    hash?: string

    @IsOptional()
    @IsEnum(['primary', 'secondary'])
    @Expose()
    severity?: 'primary' | 'secondary'
}

@Exclude()
class HeroSectionDto {
    @IsOptional()
    @IsString()
    @Expose()
    title?: string

    @IsOptional()
    @IsString()
    @Expose()
    subtitle?: string

    @IsOptional()
    @IsString()
    @Expose()
    backgroundImage?: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonItemDto)
    @Expose()
    buttons?: ButtonItemDto[]
}

@Exclude()
class RaceCardDto {
    @IsOptional()
    @IsString()
    @Expose()
    title?: string

    @IsOptional()
    @IsString()
    @Expose()
    subtitle?: string

    @IsOptional()
    @IsString()
    @Expose()
    description?: string

    @IsOptional()
    @IsString()
    @Expose()
    image?: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ButtonItemDto)
    @Expose()
    buttons?: ButtonItemDto[]
}

@Exclude()
class InfoSectionDto {
    @IsOptional()
    @IsString()
    @Expose()
    overtitle?: string

    @IsOptional()
    @IsString()
    @Expose()
    title?: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Expose()
    features?: string[]
}

@Exclude()
class GalleryImageDto {
    @IsOptional()
    @IsString()
    @Expose()
    src?: string

    @IsOptional()
    @IsString()
    @Expose()
    alt?: string

    @IsOptional()
    @IsString()
    @Expose()
    title?: string
}

@Exclude()
class ScheduleTableRowDto {
    @IsOptional()
    @IsString()
    @Expose()
    category?: string

    @IsOptional()
    @IsString()
    @Expose()
    attendance?: string

    @IsOptional()
    @IsString()
    @Expose()
    training?: string

    @IsOptional()
    @IsString()
    @Expose()
    restrictedTraining?: string

    @IsOptional()
    @IsString()
    @Expose()
    start?: string

    @IsOptional()
    @IsString()
    @Expose()
    limit?: string

    @IsOptional()
    @IsString()
    @Expose()
    announcement?: string

    @IsOptional()
    @IsString()
    @Expose()
    drawing?: string
}

@Exclude()
class LegendItemDto {
    @IsOptional()
    @IsString()
    @Expose()
    term?: string

    @IsOptional()
    @IsString()
    @Expose()
    definition?: string
}

@Exclude()
class ScheduleSectionDto {
    @IsOptional()
    @IsString()
    @Expose()
    title?: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Expose()
    description?: string[]

    @IsOptional()
    @IsString()
    @Expose()
    tableTitle?: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ScheduleTableRowDto)
    @Expose()
    scheduleTable?: ScheduleTableRowDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LegendItemDto)
    @Expose()
    legend?: LegendItemDto[]

    @IsOptional()
    @IsString()
    @Expose()
    legendTitle?: string
}

@Exclude()
class VideoSectionDto {
    @IsOptional()
    @IsString()
    @Expose()
    title?: string

    @IsOptional()
    @IsString()
    @Expose()
    videoUrl?: string
}

@Exclude()
export class UpdateMainPageContentDto {
    @IsOptional()
    @IsString()
    @Expose()
    title?: string

    @IsOptional()
    @IsBoolean()
    @Expose()
    published?: boolean

    @IsOptional()
    @IsString()
    @Expose()
    raceSectionTitle?: string

    @IsOptional()
    @ValidateNested()
    @Type(() => HeroSectionDto)
    @Expose()
    hero?: HeroSectionDto

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RaceCardDto)
    @Expose()
    raceCards?: RaceCardDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => InfoSectionDto)
    @Expose()
    info?: InfoSectionDto

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GalleryImageDto)
    @Expose()
    gallery?: GalleryImageDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => ScheduleSectionDto)
    @Expose()
    schedule?: ScheduleSectionDto

    @IsOptional()
    @ValidateNested()
    @Type(() => VideoSectionDto)
    @Expose()
    video?: VideoSectionDto
}
