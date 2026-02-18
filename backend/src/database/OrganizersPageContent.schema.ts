import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    _id: false
})
export class LinkItem {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    label: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    url: string
}
export const LinkItemSchema = SchemaFactory.createForClass(LinkItem)

@Schema({
    _id: false
})
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

@Schema({
    _id: false
})
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
        type: LinkItemSchema,
        required: false
    }])
    links?: LinkItem[]
}

@Schema({
    _id: false
})
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

export const AssociationSectionSchema = SchemaFactory.createForClass(AssociationSection)
export const OrganizingTeamSectionSchema = SchemaFactory.createForClass(OrganizingTeamSection)
export const ThanksSectionSchema = SchemaFactory.createForClass(ThanksSection)

@Schema({
    minimize: false
})
export class OrganizerPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    pageTitle: string

    @Prop({
        type: AssociationSectionSchema,
        required: true
    })
    association: AssociationSection

    @Prop({
        type: OrganizingTeamSectionSchema,
        required: true
    })
    organizingTeam: OrganizingTeamSection

    @Prop({
        type: ThanksSectionSchema,
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

export const OrganizerPageContentSchema = SchemaFactory.createForClass(OrganizerPageContent)

export type OrganizerPageContentDocument = HydratedDocument<OrganizerPageContent>
export type OrganizerPageContentLeanDocument = LeanDocument<OrganizerPageContentDocument>
