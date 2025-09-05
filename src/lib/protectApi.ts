import axios, { AxiosRequestConfig, Method } from "axios"
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
    const remoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const localHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const isValidHub = (remoteHub || localHub) && (typeof remoteHub === 'object' || typeof localHub === 'object') && ('id' in remoteHub || 'id' in localHub);
    
    const baseUrl = isValidHub 
        ? remoteHub.id
            ? apiBaseUrl
            : `http://${localHub.id}.local:8084`
        : apiBaseUrl;
    const headers: Record<string, string> = {
        'Content-Type': type ?? 'application/json',
    };
    if (remoteHub.id && !isNotCustomHeader) {
        headers['x-hub-id'] = remoteHub.id;
    }

    try {
        const response = axios<ApiResponse<T>>({
            method: method ?? 'GET',
            url: baseUrl + url,
            data: data,
            headers,
        });
        return response
    } catch (err) {
        if (err?.response?.status === 401) {
            console.log("Token expired, trying refresh...");

            const refreshed = await fetchRefreshToken();
            if (refreshed) {
                return axios<ApiResponse<T>>({
                    method: method ?? "GET",
                    url: baseUrl + url,
                    data: data,
                    headers: headers,
                });
            }
        }
        console.error(err, "err from protectApi")
        throw err;
    }
}


export const fetchRefreshToken = async () => {

    try {
        const res = await axios.post(
            `${apiBaseUrl}/refresh`,

        );
        console.log("Refresh API response:", res.status, res.data);
        return true;

    } catch (refreshErr: any) {
        console.error("Refresh token failed:", refreshErr.message, refreshErr?.response?.data);
        return false;
    }
}

