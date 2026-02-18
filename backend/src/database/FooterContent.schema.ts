import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    _id: false
})
export class Logo {
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
}

@Schema({
    _id: false
})
export class SocialLink {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    icon: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    url: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    label: string
}

@Schema({
    _id: false
})
export class FooterLink {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    label: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    to: string
}

export const FooterLinkSchema = SchemaFactory.createForClass(FooterLink)

@Schema({
    _id: false
})
export class FooterSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: [FooterLinkSchema],
        required: true
    })
    links: FooterLink[]
}

export const LogoSchema = SchemaFactory.createForClass(Logo)
export const SocialLinkSchema = SchemaFactory.createForClass(SocialLink)
export const FooterSectionSchema = SchemaFactory.createForClass(FooterSection)

@Schema()
export class FooterContent {
    @Prop({
        type: LogoSchema,
        required: true
    })
    logo: Logo

    @Prop({
        type: [SocialLinkSchema],
        required: true
    })
    socialLinks: SocialLink[]

    @Prop({
        type: [FooterSectionSchema],
        required: true
    })
    sections: FooterSection[]

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    copyright: string

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

export const FooterContentSchema = SchemaFactory.createForClass(FooterContent)

export type FooterContentDocument = HydratedDocument<FooterContent>
export type FooterContentLeanDocument = LeanDocument<FooterContentDocument>
