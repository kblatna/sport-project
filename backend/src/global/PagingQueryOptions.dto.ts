import { type PaginateOptions } from 'mongoose'
import { IsOptional, IsPositive, IsInt, Max, IsString, IsEnum } from 'class-validator'
import { Exclude, Expose, Transform, Type } from 'class-transformer'

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
    @Transform(({ value }) => value ? String(value).toLocaleLowerCase() : null, { toClassOnly: true })
    @Expose()
    sortOrder?: 'asc' | 'desc' | null

    toPaginateOptions(): PaginateOptions {
        const options: PaginateOptions = {
            page: this.page || 1,
            limit: this.limit || 25
        }
        if (this.sortBy && this.sortOrder) {
            options.sort = {
                [this.sortBy]: String(this.sortOrder).toLowerCase() === 'asc' ? 1 : -1
            }
        }
        return options
    }
}
