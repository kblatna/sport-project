import { Exclude, Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    username: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    email: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    createdAt: Date
}
