import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

@Schema({
    _id: false
})
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

export const MediaItemSchema = SchemaFactory.createForClass(MediaItem)

@Schema({
    _id: false
})
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

export const UsefulLinkSchema = SchemaFactory.createForClass(UsefulLink)

@Schema({
    minimize: false
})
export class LinksPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    heroImage: string

    @Prop({
        type: [MediaItemSchema],
        default: []
    })
    tvItems: MediaItem[]

    @Prop({
        type: [MediaItemSchema],
        default: []
    })
    videoItems: MediaItem[]

    @Prop({
        type: [MediaItemSchema],
        default: []
    })
    pressItems: MediaItem[]

    @Prop({
        type: [MediaItemSchema],
        default: []
    })
    webItems: MediaItem[]

    @Prop({
        type: [UsefulLinkSchema],
        default: []
    })
    links: UsefulLink[]
}

export const LinksPageContentSchema = SchemaFactory.createForClass(LinksPageContent)
export type LinksPageContentDocument = HydratedDocument<LinksPageContent>
export type LinksPageContentLeanDocument = LeanDocument<LinksPageContentDocument>
