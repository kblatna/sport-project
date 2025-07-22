import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

export function createService(resource: string) {
    return {
        async getAll(params?: Record<string, unknown>) {
            const response = await axios.get(`${BASE_URL}/${resource}`, { params })
            return response.data
        },

        async getById(id: string | number) {
            const response = await axios.get(`${BASE_URL}/${resource}/${id}`)
            return response.data
        },

        async create(data: any) {
            const response = await axios.post(`${BASE_URL}/${resource}`, data)
            return response.data
        },

        async update(id: string | number, data: any) {
            const response = await axios.put(`${BASE_URL}/${resource}/${id}`, data)
            return response.data
        },

        async delete(id: string | number) {
            const response = await axios.delete(`${BASE_URL}/${resource}/${id}`)
            return response.data
        }
    }
}
