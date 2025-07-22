import { IsOptional, IsPositive, IsInt, Max, IsString, IsObject, IsEnum } from 'class-validator'
import { Exclude, Expose, Transform, Type } from 'class-transformer'
import { type PaginateOptions } from 'mongoose'

export function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

@Exclude()
export class PagingQueryOptionsDto {
    @IsOptional()
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @Expose()
    page = 1

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Max(500)
    @Type(() => Number)
    @Expose()
    limit = 25

    @IsOptional()
    @IsString()
    @Expose()
    sortBy?: string

    @IsOptional()
    @IsString()
    @IsEnum(['asc', 'desc'])
    @Transform(({ value }) => (value !== null && value !== undefined) ? String(value).toLowerCase() : null, { toClassOnly: true })
    @Expose()
    sortDirection?: 'asc' | 'desc' | null

    @IsOptional()
    @IsObject()
    @Expose()
    filter: Record<string, unknown> = {}

    toPaginateOptions(): PaginateOptions {
        const options: PaginateOptions = {
            page: this.page,
            limit: this.limit,
            lean: true
        }
        if (this.sortBy != null && this.sortBy.trim() !== '') {
            options.sort = {
                [this.sortBy]: String(this.sortDirection).toLowerCase() === 'asc' ? 1 : -1
            }
        }

        return options
    }
}
