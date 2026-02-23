import { IsNotEmpty, IsString } from 'class-validator'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    refreshToken: string
}
