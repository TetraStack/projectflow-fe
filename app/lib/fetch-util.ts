import axios from "axios"
import { unknown } from "zod";

const BASE_URL = import.meta.env.VITE_API_URL;

console.log("Base URL:", BASE_URL);

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        window.dispatchEvent(new Event("force-logout"))
    }

    const errorMessage = error.response.data.message || "Something went wrong"

    return Promise.reject(errorMessage)
})

export const postData = async<T>(path: string, data?: unknown): Promise<T> => {
    const res = await api.post(path, data)

    return res.data.data
}

export const getData = async<T>(path: string): Promise<T> => {
    const res = await api.get(path)
    return res.data.data
}

export const updateDate = async<T>(path: string, data: unknown): Promise<T> => {
    const res = await api.put(path, data)
    return res.data.data
}

export const deleteData = async<T>(path: string): Promise<T> => {
    const res = await api.delete(path)
    return res.data.data
}

