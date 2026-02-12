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
        type: [FooterLink],
        required: true
    })
    links: FooterLink[]
}

@Schema({
    timestamps: true
})
export class FooterContent {
    @Prop({
        type: Logo,
        required: true
    })
    logo: Logo

    @Prop({
        type: [SocialLink],
        required: true
    })
    socialLinks: SocialLink[]

    @Prop({
        type: [FooterSection],
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

export const LogoSchema = SchemaFactory.createForClass(Logo)
export const SocialLinkSchema = SchemaFactory.createForClass(SocialLink)
export const FooterLinkSchema = SchemaFactory.createForClass(FooterLink)
export const FooterSectionSchema = SchemaFactory.createForClass(FooterSection)
export const FooterContentSchema = SchemaFactory.createForClass(FooterContent)

export type FooterContentDocument = HydratedDocument<FooterContent>
export type FooterContentLeanDocument = LeanDocument<FooterContentDocument>
