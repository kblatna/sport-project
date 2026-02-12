import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({ _id: false })
export class AssociationSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop([{
        type: SchemaTypes.String,
        required: true
    }])
    description: string[]

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    image?: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    imageAlt?: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    imageCaption?: string
}

@Schema({ _id: false })
export class OrganizingTeamSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop([{
        type: SchemaTypes.String,
        required: true
    }])
    members: string[]

    @Prop([{
        type: SchemaTypes.String,
        required: true
    }])
    description: string[]

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    image?: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    imageAlt?: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    imageCaption?: string

    @Prop([{
        label: {
            type: SchemaTypes.String,
            required: true
        },
        url: {
            type: SchemaTypes.String,
            required: true
        }
    }])
    links?: Array<{
        label: string
        url: string
    }>
}

@Schema({ _id: false })
export class ThanksSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop([{
        type: SchemaTypes.String,
        required: true
    }])
    description: string[]
}

@Schema({
    collection: 'organizerpagecontents',
    minimize: false
})
export class OrganizerPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    pageTitle: string

    @Prop({
        type: AssociationSection,
        required: true
    })
    association: AssociationSection

    @Prop({
        type: OrganizingTeamSection,
        required: true
    })
    organizingTeam: OrganizingTeamSection

    @Prop({
        type: ThanksSection,
        required: true
    })
    thanks: ThanksSection

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

export const AssociationSectionSchema = SchemaFactory.createForClass(AssociationSection)
export const OrganizingTeamSectionSchema = SchemaFactory.createForClass(OrganizingTeamSection)
export const ThanksSectionSchema = SchemaFactory.createForClass(ThanksSection)
export const OrganizerPageContentSchema = SchemaFactory.createForClass(OrganizerPageContent)

export type OrganizerPageContentDocument = HydratedDocument<OrganizerPageContent>
export type OrganizerPageContentLeanDocument = LeanDocument<OrganizerPageContentDocument>
