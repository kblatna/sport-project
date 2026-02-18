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
): Record<string, unknown> {
    const filter: Record<string, unknown> = {}

    for (const key in config) {
        const filterType = config[key]?.type
        const value = dto[key as keyof T]

        if (value === undefined || value === null) continue

        if (filterType === 'regex' && typeof value === 'string') {
            filter[key as string] = { $regex: escapeRegExp(value), $options: 'i' }
        } else {
            filter[key as string] = value
        }
    }

    return filter
}
