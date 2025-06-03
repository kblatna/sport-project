import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class CreateUserDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    username: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    email: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    createdAt: Date
}
