import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({ _id: false })
export class CategoryTableRow {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    group: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    category: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    birth: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    length: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    presentation: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    start: string
}

@Schema({ _id: false })
export class MapTab {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    label: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    mapUrl: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    imageUrl: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    alt: string
}

@Schema({ _id: false })
export class FeeCategory {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    category: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    subcategories: string

    @Prop({
        type: SchemaTypes.Number,
        required: true
    })
    price: number

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    note: string
}

@Schema({ _id: false })
export class RegistrationPaymentSection {
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
        type: [FeeCategory],
        required: true
    })
    fees: FeeCategory[]

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    bankAccount: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    variableSymbolNote: string
}

@Schema({ _id: false })
export class AttendanceSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    imageSrc: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    imagePosition: string

    @Prop({
        type: [SchemaTypes.String],
        required: true
    })
    content: string[]
}

@Schema({ _id: false })
export class PrizesSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    imageSrc: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    content: string
}

@Schema({ _id: false })
export class AwardsSection {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    title: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    imageSrc: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    imagePosition: string

    @Prop({
        type: [SchemaTypes.String],
        required: true
    })
    content: string[]
}

@Schema({ _id: false })
export class InfoPageVariant {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    pageTitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    subtitle: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    categoryDescription: string

    @Prop({
        type: [CategoryTableRow],
        required: true
    })
    categoryTable: CategoryTableRow[]

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    mapSectionTitle: string

    @Prop({
        type: [MapTab],
        required: true
    })
    mapTabs: MapTab[]

    @Prop({
        type: RegistrationPaymentSection,
        required: true
    })
    registrationPayment: RegistrationPaymentSection

    @Prop({
        type: AttendanceSection,
        required: true
    })
    attendance: AttendanceSection

    @Prop({
        type: PrizesSection,
        required: true
    })
    prizes: PrizesSection

    @Prop({
        type: AwardsSection,
        required: true
    })
    awards: AwardsSection
}

@Schema({ _id: false })
export class WashingSection {
    @Prop({ type: SchemaTypes.String, required: true })
    title: string

    @Prop({ type: SchemaTypes.String, required: true })
    imageSrc: string

    @Prop({ type: SchemaTypes.String, required: true })
    imageWidth: string

    @Prop({ type: SchemaTypes.String, required: true })
    imageHeight: string

    @Prop({ type: SchemaTypes.String, required: true })
    imagePosition: string

    @Prop({ type: [SchemaTypes.String], required: true })
    content: string[]
}

@Schema({ _id: false })
export class ParkingSection {
    @Prop({ type: SchemaTypes.String, required: true })
    title: string

    @Prop({ type: SchemaTypes.String, required: true })
    content: string
}

@Schema({ _id: false })
export class BikeServiceSection {
    @Prop({ type: SchemaTypes.String, required: true })
    title: string

    @Prop({ type: SchemaTypes.String, required: true })
    imageSrc: string

    @Prop({ type: SchemaTypes.String, required: true })
    imagePosition: string

    @Prop({ type: SchemaTypes.String, required: true })
    content: string
}

@Schema({ _id: false })
export class CommonSections {
    @Prop({ type: WashingSection, required: true })
    washing: WashingSection

    @Prop({ type: ParkingSection, required: true })
    parking: ParkingSection

    @Prop({ type: BikeServiceSection, required: true })
    bikeService: BikeServiceSection
}

@Schema({
    collection: 'infopagecontents',
    minimize: false
})
export class InfoPageContent {
    @Prop({ type: CommonSections, required: true })
    commonSections: CommonSections

    @Prop({
        type: InfoPageVariant,
        required: true
    })
    kids: InfoPageVariant

    @Prop({
        type: InfoPageVariant,
        required: true
    })
    adults: InfoPageVariant

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

export const CategoryTableRowSchema = SchemaFactory.createForClass(CategoryTableRow)
export const MapTabSchema = SchemaFactory.createForClass(MapTab)
export const FeeCategorySchema = SchemaFactory.createForClass(FeeCategory)
export const RegistrationPaymentSectionSchema = SchemaFactory.createForClass(RegistrationPaymentSection)
export const AttendanceSectionSchema = SchemaFactory.createForClass(AttendanceSection)
export const PrizesSectionSchema = SchemaFactory.createForClass(PrizesSection)
export const AwardsSectionSchema = SchemaFactory.createForClass(AwardsSection)
export const WashingSectionSchema = SchemaFactory.createForClass(WashingSection)
export const ParkingSectionSchema = SchemaFactory.createForClass(ParkingSection)
export const BikeServiceSectionSchema = SchemaFactory.createForClass(BikeServiceSection)
export const CommonSectionsSchema = SchemaFactory.createForClass(CommonSections)
export const InfoPageVariantSchema = SchemaFactory.createForClass(InfoPageVariant)
export const InfoPageContentSchema = SchemaFactory.createForClass(InfoPageContent)

export type InfoPageContentDocument = HydratedDocument<InfoPageContent>
export type InfoPageContentLeanDocument = LeanDocument<InfoPageContentDocument>
