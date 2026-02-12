import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    _id: false
})
export class ButtonItem {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    label: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    link: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    hash?: string

    @Prop({
        type: SchemaTypes.String,
        enum: ['primary', 'secondary'],
        default: 'primary'
    })
    severity: 'primary' | 'secondary'
}

@Schema({
    _id: false
})
export class HeroSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    subtitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    backgroundImage: string

    @Prop([{
        type: ButtonItem,
        required: false
    }])
    buttons: ButtonItem[]
}

@Schema({
    _id: false
})
export class RaceCard {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    subtitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    description: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    image: string

    @Prop([{
        type: ButtonItem,
        required: false
    }])
    buttons: ButtonItem[]
}

@Schema({
    _id: false
})
export class InfoSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    overtitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop([{
        type: SchemaTypes.String,
        required: true
    }])
    features: string[]
}

@Schema({
    _id: false
})
export class GalleryImage {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    src: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    alt: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string
}

@Schema({
    _id: false
})
export class ScheduleTableRow {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    category: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    attendance: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    training: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    restrictedTraining: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    start: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    limit: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    announcement: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    drawing: string
}

@Schema({
    _id: false
})
export class LegendItem {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    term: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    definition: string
}

@Schema({
    _id: false
})
export class ScheduleSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop([{
        type: SchemaTypes.String,
        required: true
    }])
    description: string[]

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    tableTitle?: string

    @Prop([{
        type: ScheduleTableRow,
        required: false
    }])
    scheduleTable: ScheduleTableRow[]

    @Prop([{
        type: LegendItem,
        required: false
    }])
    legend: LegendItem[]

    @Prop({
        type: SchemaTypes.String
    })
    legendTitle: string
}

@Schema({
    _id: false
})
export class VideoSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    videoUrl: string
}

@Schema({
    minimize: false
})
export class MainPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    slug: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.Boolean,
        default: true
    })
    published: boolean

    @Prop({
        type: SchemaTypes.String
    })
    raceSectionTitle: string

    @Prop({
        type: HeroSection,
        required: false
    })
    hero?: HeroSection

    @Prop([RaceCard])
    raceCards: RaceCard[]

    @Prop({
        type: InfoSection,
        required: false
    })
    info?: InfoSection

    @Prop([GalleryImage])
    gallery: GalleryImage[]

    @Prop({
        type: ScheduleSection,
        required: false
    })
    schedule?: ScheduleSection

    @Prop({
        type: VideoSection,
        required: false
    })
    video?: VideoSection

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    createdAt: Date

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    updatedAt: Date
}

export const ButtonItemSchema = SchemaFactory.createForClass(ButtonItem)
export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection)
export const RaceCardSchema = SchemaFactory.createForClass(RaceCard)
export const InfoSectionSchema = SchemaFactory.createForClass(InfoSection)
export const GalleryImageSchema = SchemaFactory.createForClass(GalleryImage)
export const ScheduleTableRowSchema = SchemaFactory.createForClass(ScheduleTableRow)
export const LegendItemSchema = SchemaFactory.createForClass(LegendItem)
export const ScheduleSectionSchema = SchemaFactory.createForClass(ScheduleSection)
export const VideoSectionSchema = SchemaFactory.createForClass(VideoSection)
export const MainPageContentSchema = SchemaFactory.createForClass(MainPageContent)

export type MainPageContentDocument = HydratedDocument<MainPageContent>

export type MainPageContentLeanDocument = LeanDocument<MainPageContentDocument>
