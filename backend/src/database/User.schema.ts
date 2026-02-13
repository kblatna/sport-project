import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    minimize: false
})
export class User {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    name: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    username: string

    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    email: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    password: string

    @Prop({
        type: SchemaTypes.Boolean,
        default: true
    })
    isActive: boolean

    @Prop({
        type: SchemaTypes.String,
        enum: ['editor', 'admin'],
        default: 'editor'
    })
    role: string

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    createdAt: Date

    @Prop({
        type: SchemaTypes.Date,
        default: null
    })
    lastLogin: Date | null

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
export type UserDocument = HydratedDocument<User>
export type UserLeanDocument = LeanDocument<UserDocument>
