import axios from 'axios'
import type { PaginateResult } from '@/interface/PaginateResult.interface'

// TODO: Add axios interceptors for:
// - Automatic token refresh
// - Global error handling
// - Request/response logging (dev only)
// Example:
// axios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
//             // Handle unauthorized
//         }
//         return Promise.reject(error)
//     }
// )

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

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
            const response = await axios.get<PaginateResult<T>>(`${BASE_URL}/${resource}/paginate`, { params })
            return response.data
        }
    }
}
