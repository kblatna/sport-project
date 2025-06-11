import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@Exclude()
export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    message: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    token: string

    @IsOptional()
    @IsString()
    @Expose()
    honeypot?: string
}
