import { Exclude, Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { PagingQueryOptionsDto } from '../../../global/PagingQueryOptions.dto'

@Exclude()
export class ListResultsQueryDto extends PagingQueryOptionsDto {
    @IsOptional()
    @IsString()
    @Expose()
    rank?: string

    @IsOptional()
    @IsString()
    @Expose()
    startNumber?: string

    @IsOptional()
    @IsString()
    @Expose()
    name?: string

    @IsOptional()
    @IsString()
    @Expose()
    dateOfBirth?: string

    @IsOptional()
    @IsString()
    @Expose()
    totalTime?: string

    @IsOptional()
    @IsString()
    @Expose()
    category?: string

    @IsOptional()
    @IsString()
    @Expose()
    year?: string
}
