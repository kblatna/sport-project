import { UserRole } from '../../../database/User.schema'

export interface JwtPayload {
    sub: string // user ID
    email: string
    role: UserRole
    iat?: number
    exp?: number
}

export interface RefreshTokenPayload {
    sub: string
    type: 'refresh'
    iat?: number
    exp?: number
}
