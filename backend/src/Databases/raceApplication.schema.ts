import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    minimize: false,
    versionKey: false
})
export class RaceApplication {
    @Prop({
        type: SchemaTypes.String,
        required: true,
        trim: true
    })
    firstName: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        trim: true
    })
    lastName: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    })
    email: string

    @Prop({
        type: SchemaTypes.Date,
        required: true
    })
    dateOfBirth: Date

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    category: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    race: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    token: string

    @Prop({
        type: SchemaTypes.String,
        default: ''
    })
    honeypot?: string

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    createdAt: Date
}

export const RaceApplicationSchema = SchemaFactory.createForClass(RaceApplication)
export type RaceApplicationDocument = HydratedDocument<RaceApplication>
export type RaceApplicationLeanDocument = LeanDocument<RaceApplicationDocument>
