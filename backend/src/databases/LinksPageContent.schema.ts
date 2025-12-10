import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

@Schema({ _id: false })
export class MediaItem {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String
    })
    link?: string
}

@Schema({ _id: false })
export class UsefulLink {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    text: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    icon: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    link: string
}

@Schema()
export class LinksPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    heroImage: string

    @Prop({
        type: [MediaItem],
        default: []
    })
    tvItems: MediaItem[]

    @Prop({
        type: [MediaItem],
        default: []
    })
    videoItems: MediaItem[]

    @Prop({
        type: [MediaItem],
        default: []
    })
    pressItems: MediaItem[]

    @Prop({
        type: [MediaItem],
        default: []
    })
    webItems: MediaItem[]

    @Prop({
        type: [UsefulLink],
        default: []
    })
    links: UsefulLink[]
}

export const LinksPageContentSchema = SchemaFactory.createForClass(LinksPageContent)
export type LinksPageContentDocument = HydratedDocument<LinksPageContent>
export type LinksPageContentLeanDocument = LeanDocument<LinksPageContentDocument>
