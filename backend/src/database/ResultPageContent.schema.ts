import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

@Schema({
    _id: false
})
export class ResultColumnHeaders {
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

export const ResultColumnHeadersSchema = SchemaFactory.createForClass(ResultColumnHeaders)

@Schema({
    _id: false
})
export class ResultFilterPlaceholders {
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
    category: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    year: string
}

export const ResultFilterPlaceholdersSchema = SchemaFactory.createForClass(ResultFilterPlaceholders)

@Schema({
    _id: false
})
export class ResultEmptyState {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    subtitle: string
}

export const ResultEmptyStateSchema = SchemaFactory.createForClass(ResultEmptyState)

@Schema({
    minimize: false
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
        type: ResultColumnHeaders,
        required: true
    })
    columnHeaders: ResultColumnHeaders

    @Prop({
        type: ResultFilterPlaceholders,
        required: true
    })
    filterPlaceholders: ResultFilterPlaceholders

    @Prop({
        type: ResultEmptyState,
        required: true
    })
    emptyState: ResultEmptyState

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    loadingText: string
}

export type ResultPageContentDocument = HydratedDocument<ResultPageContent>

export const ResultPageContentSchema = SchemaFactory.createForClass(ResultPageContent)

ResultPageContentSchema.plugin(mongoosePaginate)
