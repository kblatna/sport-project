import axios from 'axios'
import type { PaginateResult } from '@/interface/PaginateResult.interface'
import router from '@/services/router/router'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

// Setup axios interceptors for JWT token
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

// Setup axios interceptors for global error handling and token refresh
axios.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config

        // Handle 401 Unauthorized - try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                    }
                    return axios(originalRequest)
                }).catch(err => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            const refreshToken = localStorage.getItem('refreshToken')

            if (!refreshToken) {
                // No refresh token, redirect to login
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                router.push({ name: 'Login' })
                return Promise.reject(error)
            }

            try {
                // Try to refresh the token
                const response = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken
                })

                const newAccessToken = response.data.accessToken
                localStorage.setItem('accessToken', newAccessToken)

                // Update the original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                }

                processQueue(null, newAccessToken)
                return axios(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                // Refresh failed, logout user
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
                router.push({ name: 'Login' })
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        // Handle 404 errors - let component handle these (might be expected)
        if (error.response?.status === 404) {
            // Don't redirect automatically, let component decide
            return Promise.reject(error)
        }

        // Handle 500+ server errors - redirect to error page
        if (error.response?.status >= 500) {
            router.push({ name: 'ServerError' })
            return Promise.reject(error)
        }

        // Handle network errors (no response from server)
        if (!error.response) {
            console.error('Network error:', error.message)
            router.push({ name: 'ServerError' })
            return Promise.reject(error)
        }

        // Log other errors in development
        if (import.meta.env.DEV) {
            console.error('API Error:', error.response?.status, error.response?.data)
        }

        return Promise.reject(error)
    }
)

export function createService<T = unknown>(resource: string) {
    return {
        async getAll(params?: Record<string, unknown>): Promise<T> {
            const response = await axios.get<T>(`${BASE_URL}/${resource}`, { params })
            return response.data
        },

        async getById(id: string | number): Promise<T> {
            const response = await axios.get<T>(`${BASE_URL}/${resource}/${id}`)
            return response.data
        },

        async create(data: Partial<T>): Promise<T> {
            const response = await axios.post<T>(`${BASE_URL}/${resource}`, data)
            return response.data
        },

        async update(id: string | number, data: Partial<T>): Promise<T> {
            const response = await axios.patch<T>(`${BASE_URL}/${resource}/${id}`, data)
            return response.data
        },

        async delete(id: string | number): Promise<void> {
            const response = await axios.delete(`${BASE_URL}/${resource}/${id}`)
            return response.data
        },

        async paginate(params?: Record<string, unknown>): Promise<PaginateResult<T>> {
            const response = await axios.get<PaginateResult<T>>(`${BASE_URL}/${resource}`, { params })
            return response.data
        }
    }
}
