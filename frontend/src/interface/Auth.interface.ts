export type UserRole = 'admin' | 'editor'

export interface User {
    _id: string
    name: string
    email: string
    role: UserRole
    isActive: boolean
    createdAt: string
    updatedAt?: string
    lastLogin?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    accessToken: string
    refreshToken: string
    user: User
}

export interface RefreshTokenRequest {
    refreshToken: string
}

export interface RefreshTokenResponse {
    accessToken: string
}
