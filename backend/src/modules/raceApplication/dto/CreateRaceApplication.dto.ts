import { Exclude, Expose, Type } from 'class-transformer'
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

@Exclude()
export class CreateRaceApplicationDto {
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
    @Type(() => Date)
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

    @IsOptional()
    @IsString()
    @MaxLength(500)
    @Expose()
    note?: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    token: string

    @IsOptional()
    @IsString()
    @Expose()
    honeypot?: string | null
}
