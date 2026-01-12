import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

@Schema({
    minimize: false,
    versionKey: false
})
export class Result {
    @Prop({
        type: SchemaTypes.Number,
        required: true
    })
    rank: number

    @Prop({
        type: SchemaTypes.Number,
        required: true
    })
    startNumber: number

    @Prop({
        type: SchemaTypes.Number,
        required: true
    })
    dateOfBirth: number

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    name: string

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
        type: SchemaTypes.Number,
        required: true
    })
    year: number
}

export type ResultDocument = HydratedDocument<Result>
export type ResultLeanDocument = LeanDocument<ResultDocument>

export const ResultSchema = SchemaFactory.createForClass(Result)
ResultSchema.plugin(mongoosePaginate)
ResultSchema.index({ year: 1, category: 1 })
ResultSchema.index({ name: 1 })
