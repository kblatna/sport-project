import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, type HydratedDocument } from 'mongoose'

@Schema({
    _id: false
})
export class NavItem {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    label: string

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    to: string

    @Prop({
        type: SchemaTypes.Boolean,
        default: true
    })
    visible?: boolean

    children?: NavItem[]
}

export const NavItemSchema = SchemaFactory.createForClass(NavItem)

NavItemSchema.add({
    children: {
        type: [NavItemSchema],
        required: false,
        default: undefined
    }
})

@Schema()
export class Navigation {
    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    name: string

    @Prop({
        type: SchemaTypes.String,
        required: false
    })
    locale?: string

    @Prop({
        type: [NavItemSchema],
        required: true
    })
    items: NavItem[]

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

export const NavigationSchema = SchemaFactory.createForClass(Navigation)

export type NavigationDocument = HydratedDocument<Navigation>
export type NavigationLeanDocument = LeanDocument<NavigationDocument>
