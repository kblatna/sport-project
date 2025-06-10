import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRaceSignupDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsDate()
    dateOfBirth: Date

    @IsNotEmpty()
    @IsString()
    category: string

    @IsNotEmpty()
    @IsString()
    race: string

    @IsNotEmpty()
    @IsString()
    token: string

    @IsOptional()
    @IsString()
    honeypot?: string
}
