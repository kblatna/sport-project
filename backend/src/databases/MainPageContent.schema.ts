import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({ _id: false })
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
        label: {
            type: SchemaTypes.String,
            required: true
        },
        link: {
            type: SchemaTypes.String,
            required: true
        },
        hash: {
            type: SchemaTypes.String,
            required: false
        },
        severity: {
            type: SchemaTypes.String,
            enum: ['primary', 'secondary'],
            default: 'primary'
        }
    }])
    buttons: Array<{
        label: string
        link: string
        hash?: string
        severity: 'primary' | 'secondary'
    }>
}

@Schema({ _id: false })
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
        label: {
            type: SchemaTypes.String,
            required: true
        },
        link: {
            type: SchemaTypes.String,
            required: true
        },
        hash: {
            type: SchemaTypes.String,
            required: false
        },
        severity: {
            type: SchemaTypes.String,
            enum: ['primary', 'secondary'],
            default: 'primary'
        }
    }])
    buttons: Array<{
        label: string
        link: string
        hash?: string
        severity: 'primary' | 'secondary'
    }>
}

@Schema({ _id: false })
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

@Schema({ _id: false })
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

@Schema({ _id: false })
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
        required: true
    })
    tableTitle: string

    @Prop([{
        category: {
            type: SchemaTypes.String,
            required: true
        },
        attendance: {
            type: SchemaTypes.String,
            required: true
        },
        training: {
            type: SchemaTypes.String,
            required: true
        },
        restrictedTraining: {
            type: SchemaTypes.String,
            required: true
        },
        start: {
            type: SchemaTypes.String,
            required: true
        },
        limit: {
            type: SchemaTypes.String,
            required: true
        },
        announcement: {
            type: SchemaTypes.String,
            required: true
        },
        drawing: {
            type: SchemaTypes.String,
            required: true
        }
    }])
    scheduleTable: Array<{
        category: string
        attendance: string
        training: string
        restrictedTraining: string
        start: string
        limit: string
        announcement: string
        drawing: string
    }>

    @Prop([{
        term: {
            type: SchemaTypes.String,
            required: true
        },
        definition: {
            type: SchemaTypes.String,
            required: true
        }
    }])
    legend: Array<{
        term: string
        definition: string
    }>

    @Prop({
        type: SchemaTypes.String
    })
    legendTitle: string
}

@Schema({ _id: false })
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
    collection: 'mainpagecontents',
    minimize: false,
    versionKey: false
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

export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection)
export const RaceCardSchema = SchemaFactory.createForClass(RaceCard)
export const InfoSectionSchema = SchemaFactory.createForClass(InfoSection)
export const GalleryImageSchema = SchemaFactory.createForClass(GalleryImage)
export const ScheduleSectionSchema = SchemaFactory.createForClass(ScheduleSection)
export const VideoSectionSchema = SchemaFactory.createForClass(VideoSection)
export const MainPageContentSchema = SchemaFactory.createForClass(MainPageContent)

export type MainPageContentDocument = HydratedDocument<MainPageContent>

export type MainPageContentLeanDocument = LeanDocument<MainPageContentDocument>
