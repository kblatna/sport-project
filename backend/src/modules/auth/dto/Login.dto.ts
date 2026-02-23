import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

@Exclude()
export class LoginDto {
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
