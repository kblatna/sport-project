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
        variant: {
            type: SchemaTypes.String,
            enum: ['primary', 'secondary'],
            default: 'primary'
        }
    }])
    buttons: Array<{
        label: string
        link: string
        variant: 'primary' | 'secondary'
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
        variant: {
            type: SchemaTypes.String,
            enum: ['primary', 'outlined'],
            default: 'primary'
        }
    }])
    buttons: Array<{
        label: string
        link: string
        variant: 'primary' | 'outlined'
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
export const MainPageContentSchema = SchemaFactory.createForClass(MainPageContent)

export type MainPageContentDocument = HydratedDocument<MainPageContent>

export type MainPageContentLeanDocument = LeanDocument<MainPageContentDocument>
