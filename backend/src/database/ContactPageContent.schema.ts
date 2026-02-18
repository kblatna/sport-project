import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    _id: false
})
export class Address {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    organizationName: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    street: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    city: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    zipCode: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    mapLink?: string
}

@Schema({
    _id: false
})
export class ContactInfo {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    email: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    phone: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    facebook?: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    instagram?: string
}

export const AddressSchema = SchemaFactory.createForClass(Address)
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo)

@Schema({
    minimize: false
})
export class ContactPageContent {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    pageTitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    introText: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    addressSectionTitle: string

    @Prop({
        type: AddressSchema,
        required: true
    })
    address: Address

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    showMap: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    contactSectionTitle: string

    @Prop({
        type: ContactInfoSchema,
        required: true
    })
    contactInfo: ContactInfo

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    formSectionTitle: string

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

export const ContactPageContentSchema = SchemaFactory.createForClass(ContactPageContent)

export type ContactPageContentDocument = HydratedDocument<ContactPageContent>
export type ContactPageContentLeanDocument = LeanDocument<ContactPageContentDocument>
