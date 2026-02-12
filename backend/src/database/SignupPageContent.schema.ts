import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({ _id: false })
export class LogoImage {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    src: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    alt?: string
}

@Schema({
    collection: 'signuppagecontents',
    minimize: false
})
export class SignupPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    pageTitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    introText: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    cardTitle: string

    @Prop([
        LogoImage
    ])
    logos: LogoImage[]

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

export const LogoImageSchema = SchemaFactory.createForClass(LogoImage)
export const SignupPageContentSchema = SchemaFactory.createForClass(SignupPageContent)

export type SignupPageContentDocument = HydratedDocument<SignupPageContent>
export type SignupPageContentLeanDocument = LeanDocument<SignupPageContentDocument>
