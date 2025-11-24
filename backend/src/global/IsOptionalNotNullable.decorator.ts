import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationTypes,
    getMetadataStorage
} from 'class-validator'

export const IS_OPTIONAL_NOT_NULLABLE = 'isOptionalNotNullable'

@ValidatorConstraint({ name: IS_OPTIONAL_NOT_NULLABLE, async: false })
class IsOptionalNotNullableConstraint implements ValidatorConstraintInterface {
    validate(value: unknown): boolean {
        return typeof value === 'undefined' || value !== null
    }

    defaultMessage(args: ValidationArguments): string {
        return `${args.property} cannot be null. It can be undefined or have a value.`
    }
}

export function IsOptionalNotNullable(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        const metadata = {
            type: ValidationTypes.CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [
                (obj: unknown, value: unknown) => value !== undefined
            ],
            validationOptions: validationOptions,
            validator: IsOptionalNotNullableConstraint,
            async: false
        }

        getMetadataStorage().addValidationMetadata(metadata as any)

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsOptionalNotNullableConstraint
        })
    }
}
