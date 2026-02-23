import axios from 'axios'
import type {
    LoginRequest,
    LoginResponse,
    RefreshTokenResponse,
    User
} from '@/interface/Auth.interface'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const authService = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>(
            `${BASE_URL}/auth/login`,
            credentials
        )
        return response.data
    },

    async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        const response = await axios.post<RefreshTokenResponse>(
            `${BASE_URL}/auth/refresh`,
            { refreshToken }
        )
        return response.data
    },

    async me(): Promise<User> {
        const response = await axios.get<User>(`${BASE_URL}/auth/me`)
        return response.data
    },

    logout(): void {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
    }
}
