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
    const hubId = JSON.parse(getLocalStorageItem('hub')?? '{}')?.id
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        'Content-Type': type ?? 'application/json',
    };
    if (hubId) {
        headers['x-hub-id'] = hubId;
    }
    return axios<ApiResponse<T>>({
        method: method ?? 'GET',
        url: apiBaseUrl + url,
        data: data,
        headers,
    });
}

