import axios, { Method } from "axios"
import { getLocalStorageItem } from "./storage"
import { apiBaseUrl } from "@/services/config"


export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export async function protectApi<T, D = undefined>(url: string,
    method?: Method,
    data?: D, type?: string) {
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token

    return axios<ApiResponse<T>>({
        method: method ?? 'GET',
        url: apiBaseUrl + url,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': type ?? 'application/json'
        },
    });
}

