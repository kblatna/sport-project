import { FilterQuery } from 'mongoose'

export type FilterConfig<T> = {
    [K in keyof Partial<T>]?: {
        type: 'exact' | 'regex'
    }
}

export function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function buildFilterQuery<T>(
    dto: Partial<T>,
    config: FilterConfig<T>
): FilterQuery<T> {
    const filter: FilterQuery<T> = {}

    for (const key in config) {
        const filterType = config[key]?.type
        const value = dto[key as keyof T]

        if (value === undefined || value === null) continue

        if (filterType === 'regex' && typeof value === 'string') {
            filter[key as keyof T] = { $regex: escapeRegExp(value), $options: 'i' } as any
        } else {
            filter[key as keyof T] = value as any
        }
    }

    return filter
}
