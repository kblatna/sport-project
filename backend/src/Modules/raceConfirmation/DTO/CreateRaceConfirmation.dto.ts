import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRaceConfirmationDto { // TODO: upravit
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    message: string

    @IsNotEmpty()
    @IsString()
    token: string

    @IsOptional()
    @IsString()
    honeypot?: string
}
