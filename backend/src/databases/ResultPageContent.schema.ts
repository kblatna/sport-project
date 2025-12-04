import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

@Schema({
    minimize: false,
    versionKey: false
})
export class ResultPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    description: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    tableTitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    resetButtonLabel: string

    @Prop({
        type: SchemaTypes.Mixed,
        required: true
    })
    columnHeaders: {
        rank: string
        startNumber: string
        name: string
        dateOfBirth: string
        totalTime: string
        category: string
        year: string
    }

    @Prop({
        type: SchemaTypes.Mixed,
        required: true
    })
    filterPlaceholders: {
        startNumber: string
        name: string
        dateOfBirth: string
        category: string
        year: string
    }

    @Prop({
        type: SchemaTypes.Mixed,
        required: true
    })
    emptyState: {
        title: string
        subtitle: string
    }

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    loadingText: string
}

export type ResultPageContentDocument = HydratedDocument<ResultPageContent>

export const ResultPageContentSchema = SchemaFactory.createForClass(ResultPageContent)

ResultPageContentSchema.plugin(mongoosePaginate)
