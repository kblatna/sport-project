import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator'

@Exclude()
export class CreateUserDto {
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
