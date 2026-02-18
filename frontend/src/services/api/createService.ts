import axios from 'axios'
import type { PaginateResult } from '@/interface/PaginateResult.interface'
import router from '@/services/router/router'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Setup axios interceptors for global error handling
axios.interceptors.response.use(
    response => response,
    (error) => {
        // Handle 404 errors - let component handle these (might be expected)
        if (error.response?.status === 404) {
            // Don't redirect automatically, let component decide
            return Promise.reject(error)
        }

        // Handle 500+ server errors - redirect to error page
        if (error.response?.status >= 500) {
            router.push('/500')
            return Promise.reject(error)
        }

        // Handle network errors (no response from server)
        if (!error.response) {
            console.error('Network error:', error.message)
            router.push('/500')
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
            const response = await axios.put<T>(`${BASE_URL}/${resource}/${id}`, data)
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
