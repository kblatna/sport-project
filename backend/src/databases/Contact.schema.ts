import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    minimize: false,
    versionKey: false
})
export class Contact {
    @Prop({
        type: SchemaTypes.String,
        required: true,
        trim: true
    })
    name: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    })
    email: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    message: string

    @Prop({
        type: SchemaTypes.String,
        default: ''
    })
    honeypot?: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    token: string

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    createdAt: Date
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
ContactSchema.index({ createdAt: -1 })
export type ContactDocument = HydratedDocument<Contact>
export type ContactLeanDocument = LeanDocument<ContactDocument>
