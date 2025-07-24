import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

@Schema({
    minimize: false,
    versionKey: false
})
export class Result {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    rank: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    startNumber: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    name: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    dateOfBirth: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    totalTime: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    category: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    year: string
}

export type ResultDocument = HydratedDocument<Result>
export type ResultLeanDocument = LeanDocument<ResultDocument>

export const ResultSchema = SchemaFactory.createForClass(Result)
ResultSchema.plugin(mongoosePaginate)
