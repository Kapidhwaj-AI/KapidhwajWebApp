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
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    
    const baseUrl = isValidHub 
        ? remoteHub.id
            ? apiBaseUrl
            : `http://${localHub.id}.local:8084`
        : apiBaseUrl;
    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        'Content-Type': type ?? 'application/json',
    };
    if (remoteHub && !isNotCustomHeader) {
        headers['x-hub-id'] = remoteHub.id;
    }

    return axios<ApiResponse<T>>({
        method: method ?? 'GET',
        url: baseUrl + url,
        data: data,
        headers,
    });
}

