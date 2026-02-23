import { Body, Controller, HttpCode, HttpException, Logger, Post, UseGuards, Get, Request } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { AuthService } from './Auth.service'
import { LoginDto } from './dto/Login.dto'
import { BootstrapDto } from './dto/Bootstrap.dto'
import { RefreshTokenDto } from './dto/RefreshToken.dto'
import { ErrorException } from '../../global/Error.exception'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RequestWithUser } from './interface/RequestWithUser.interface'

type LoginResponse = {
    accessToken: string
    refreshToken: string
}

type BootstrapResponse = {
    message: string
    user: {
        id: string
        email: string
        name: string
    }
}

type UserInfoResponse = {
    id: string
    email: string
    role: string
}

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name)

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        try {
            return await this.authService.login(loginDto)
        } catch (error) {
            if (error instanceof ErrorException) {
                throw new HttpException(error.message, error.code)
            }
            throw error
        }
    }

    @Post('bootstrap')
    @HttpCode(201)
    @Throttle({ default: { limit: 3, ttl: 3600000 } })
    async bootstrap(@Body() bootstrapDto: BootstrapDto): Promise<BootstrapResponse> {
        try {
            return await this.authService.bootstrap(bootstrapDto)
        } catch (error) {
            if (error instanceof ErrorException) {
                throw new HttpException(error.message, error.code)
            }
            throw error
        }
    }

    @Post('refresh')
    @HttpCode(200)
    async refreshToken(@Body() dto: RefreshTokenDto): Promise<{ accessToken: string }> {
        try {
            return await this.authService.refreshAccessToken(dto.refreshToken)
        } catch (error) {
            if (error instanceof ErrorException) {
                throw new HttpException(error.message, error.code)
            }
            throw error
        }
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@Request() req: RequestWithUser): UserInfoResponse {
        return {
            id: req.user.sub,
            email: req.user.email,
            role: req.user.role
        }
    }
}
