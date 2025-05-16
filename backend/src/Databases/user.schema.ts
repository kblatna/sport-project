import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    minimize: false,
    versionKey: false
})
export class User {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    name: string

    // @Prop({
    //     type: SchemaTypes.String,
    //     required: true,
    //     index: {
    //         unique: true
    //     },
    // })
    // username: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    email: string

    @Prop({
        type: SchemaTypes.Date,
        default: () => new Date()
    })
    createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
export type UserDocument = HydratedDocument<User>
export type UserLeanDocument = LeanDocument<UserDocument>
