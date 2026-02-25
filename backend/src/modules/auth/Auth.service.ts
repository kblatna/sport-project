import { Injectable, Logger, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user/User.service'
import { LoginDto } from './dto/Login.dto'
import { BootstrapDto } from './dto/Bootstrap.dto'
import { JwtPayload, RefreshTokenPayload } from './interface/JwtPayload.interface'
import { UserDocument, UserRole } from '../../database/User.schema'
import { BootstrapAdminData } from '../user/interface/BootstrapAdmin.interface'

type LoginResponse = {
    accessToken: string
    refreshToken: string
    user: {
        _id: string
        name: string
        email: string
        role: UserRole
        isActive: boolean
        createdAt: Date
        lastLogin?: Date
    }
}

type BootstrapResponse = {
    message: string
    user: {
        id: string
        email: string
        name: string
    }
}

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const { email, password } = loginDto

        const user: UserDocument | null = await this.userService.getUserByEmail(email)
        if (user === null) {
            this.logger.warn(`Login failed - user not found: ${email}`)
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            this.logger.warn(`Login failed - invalid password: ${email}`)
            throw new UnauthorizedException('Invalid email or password')
        }

        const accessToken = this.generateAccessToken(user._id.toString(), user.email, user.role)
        const refreshToken = this.generateRefreshToken(user._id.toString())

        await this.userService.updateLastLogin(user._id.toString())
        this.logger.log(`User logged in: ${user.email}`)

        return {
            accessToken,
            refreshToken,
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin ?? undefined
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private generateToken(payload: Record<string, any>, expiresIn: string): string {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
        return this.jwtService.sign(payload, { expiresIn } as any)
    }

    private generateAccessToken(userId: string, email: string, role: string): string {
        const payload: JwtPayload = { sub: userId, email, role: role as UserRole }
        const expiresIn = this.configService.get<string>('jwt.expiresIn', { infer: true }) ?? '15m'
        return this.generateToken(payload, expiresIn)
    }

    private generateRefreshToken(userId: string): string {
        const payload: RefreshTokenPayload = { sub: userId, type: 'refresh' }
        const expiresIn = this.configService.get<string>('jwt.refreshExpiresIn', { infer: true }) ?? '7d'
        return this.generateToken(payload, expiresIn)
    }

    async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            const decoded = this.jwtService.verify(refreshToken)

            if (typeof decoded !== 'object' || decoded === null || (decoded).type !== 'refresh') {
                this.logger.warn('Refresh failed - invalid token type')
                throw new UnauthorizedException('Invalid token type')
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const userId = (decoded).sub
            if (!userId || typeof userId !== 'string') {
                throw new UnauthorizedException('Invalid token payload')
            }

            const user = await this.userService.getUserById(userId)
            if (!user) {
                throw new UnauthorizedException('User not found')
            }

            const newAccessToken = this.generateAccessToken(
                user._id.toString(),
                user.email,
                user.role
            )

            return { accessToken: newAccessToken }
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error'
            this.logger.error(
                `Refresh token failed: ${errorMsg}`,
                error instanceof Error ? error.stack : undefined
            )
            throw new UnauthorizedException('Invalid refresh token')
        }
    }

    async bootstrap(bootstrapDto: BootstrapDto): Promise<BootstrapResponse> {
        const existingAdmins = await this.userService.getAdminCount()
        if (existingAdmins > 0) {
            this.logger.warn('Bootstrap attempted - admins already exist')
            throw new BadRequestException('Bootstrap is only allowed when no admins exist. System already initialized.')
        }

        const hashedPassword = await bcrypt.hash(bootstrapDto.password, 10)

        const adminData: BootstrapAdminData = {
            name: bootstrapDto.name,
            email: bootstrapDto.email,
            password: hashedPassword
        }

        const adminUser = await this.userService.createBootstrapAdmin(adminData)

        this.logger.log(`Bootstrap admin created: ${bootstrapDto.email}`)

        return {
            message: 'Admin account created successfully. You can now login.',
            user: {
                id: adminUser._id.toString(),
                email: adminUser.email,
                name: adminUser.name
            }
        }
    }
}
