import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsOptional, IsString } from 'class-validator'

@Exclude()
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Expose()
    name?: string

    @IsOptional()
    @IsEmail()
    @Expose()
    email?: string
}
