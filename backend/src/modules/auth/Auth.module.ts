import { Module } from '@nestjs/common'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './Auth.service'
import { AuthController } from './Auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserModule } from '../user/User.module'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService): JwtModuleOptions => ({
                secret: configService.get<string>('jwt.secret', { infer: true })!,
                signOptions: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    expiresIn: (configService.get<string>('jwt.expiresIn', { infer: true }) || '15m') as any
                }
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
