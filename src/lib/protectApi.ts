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
    data?: D, type?: string, isNotCustomHeader?: boolean) {
    const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
    const hub = JSON.parse(getLocalStorageItem('hub') ?? '{}')
    const isValidHub = hub && typeof hub === 'object' && 'id' in hub && 'isRemotely' in hub;
    const baseUrl = isValidHub && !isNotCustomHeader
        ? hub.isRemotely
            ? apiBaseUrl
            : `http://${hub.id}.local:8084`
        : apiBaseUrl;
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        'Content-Type': type ?? 'application/json',
    };
    if (hub.isRemotely && !isNotCustomHeader) {
        headers['x-hub-id'] = hub.id;
    }

    return axios<ApiResponse<T>>({
        method: method ?? 'GET',
        url: 'http://localhost:8084' + url,
        data: data,
        headers,
    });
}

