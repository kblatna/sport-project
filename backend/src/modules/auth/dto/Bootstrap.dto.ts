import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class BootstrapDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    username: string

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
    @MinLength(6)
    @Expose()
    password: string
}
