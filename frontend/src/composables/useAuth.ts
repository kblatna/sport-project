import { ref, computed } from 'vue'
import { authService } from '@/services/api/authService'
import type { LoginRequest, User } from '@/interface/Auth.interface'
import router from '@/services/router/router'

const user = ref<User | null>(null)
const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const initAuth = () => {
    const storedUser = localStorage.getItem('user')
    const storedAccessToken = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')

    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null' && storedAccessToken) {
        try {
            user.value = JSON.parse(storedUser)
            accessToken.value = storedAccessToken
            refreshToken.value = storedRefreshToken
        } catch (e) {
            console.error('Invalid auth data in localStorage, clearing...', e)
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
}

initAuth()

export function useAuth() {
    const isAuthenticated = computed(() => !!user.value && !!accessToken.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const isEditor = computed(() => user.value?.role === 'editor')

    const login = async (credentials: LoginRequest) => {
        isLoading.value = true
        error.value = null

        try {
            const response = await authService.login(credentials)

            accessToken.value = response.accessToken
            refreshToken.value = response.refreshToken
            user.value = response.user

            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
            localStorage.setItem('user', JSON.stringify(response.user))

            return response
        } catch (e: any) {
            error.value = e.response?.data?.message || 'Přihlášení selhalo'
            throw e
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {
        authService.logout()
        user.value = null
        accessToken.value = null
        refreshToken.value = null
        error.value = null

        await router.push('/login')
    }

    const refreshAccessToken = async () => {
        if (!refreshToken.value) {
            throw new Error('No refresh token available')
        }

        try {
            const response = await authService.refreshToken(refreshToken.value)
            accessToken.value = response.accessToken
            localStorage.setItem('accessToken', response.accessToken)
            return response.accessToken
        } catch (e) {
            await logout()
            throw e
        }
    }

    const fetchCurrentUser = async () => {
        if (!accessToken.value) {
            return null
        }

        try {
            const currentUser = await authService.me()
            user.value = currentUser
            localStorage.setItem('user', JSON.stringify(currentUser))
            return currentUser
        } catch (e) {
            await logout()
            throw e
        }
    }

    const clearError = () => {
        error.value = null
    }

    return {
        user,
        accessToken,
        isAuthenticated,
        isAdmin,
        isEditor,
        isLoading,
        error,

        login,
        logout,
        refreshAccessToken,
        fetchCurrentUser,
        clearError
    }
}
