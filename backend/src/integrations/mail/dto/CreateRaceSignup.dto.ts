import { Exclude, Expose } from 'class-transformer'
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@Exclude()
export class CreateRaceSignupDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    firstName: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string

    @IsNotEmpty()
    @IsDate()
    @Expose()
    dateOfBirth: Date

    @IsNotEmpty()
    @IsString()
    @Expose()
    category: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    race: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    token: string

    @IsOptional()
    @IsString()
    @Expose()
    honeypot?: string | null
}
