import { Transform } from 'class-transformer'

export function TransformBoolean(): PropertyDecorator {
    return Transform(({ value }: { value: any }) => {
        if (value === undefined) {
            return undefined
        }
        return ['1', 'true', 'yes', 'on'].includes(`${value}`.toLowerCase())
    })
}
