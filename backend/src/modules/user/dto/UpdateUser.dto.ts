import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsOptional, IsString, IsEnum, IsBoolean, MinLength } from 'class-validator'
import { UserRole } from '../../../database/User.schema'

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

    @IsOptional()
    @IsString()
    @MinLength(6)
    @Expose()
    password?: string

    @IsOptional()
    @IsEnum(['admin', 'editor'])
    @Expose()
    role?: UserRole

    @IsOptional()
    @IsBoolean()
    @Expose()
    isActive?: boolean
}
