import { Exclude, Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

@Exclude()
export class UpdateUserDto {
    @Expose()
    @IsOptional()
    @IsString()
    name?: string

    @Expose()
    @IsOptional()
    @IsString()
    email?: string
}
