import axios, {  Method } from "axios";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "./storage";
import {  LOCALSTORAGE_KEY } from "@/services/config";
import { showToast } from "./showToast";
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export const getApiBaseUrl = () => {
    if (typeof window === "undefined") return "";

    const { hostname } = window.location;

    // When running on the hub itself
    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return "http://localhost";
    }

    // When accessed from another machine (IP or domain)
    return `http://${hostname}`;
};
export const getSocketApiBaseUrl = () => {
    if (typeof window === "undefined") return "";

    const { hostname } = window.location;

    // When running on the hub itself
    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return "ws://localhost:8084";
    }

    // When accessed from another machine (IP or domain)
    return `ws://${hostname}:8084`;
};
export const BASE_URL = getApiBaseUrl()
const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
export async function protectApi<T, D = undefined>(url: string,
    method?: Method,
    data?: D, type?: string, isNotCustomHeader?: boolean, params?: unknown) {

    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        'Content-Type': type ?? 'application/json',
    };

    try {
        const response = await axios<ApiResponse<T>>({
            method: method ?? 'GET',
            url: BASE_URL + ':8084' + url,
            data: data,
            headers,
            params
        });
        return response
    } catch (err) {
        if (err?.response?.status === 401) {
            console.log("Token expired, trying refresh...");
            const refreshed = await fetchRefreshToken();
            if (refreshed) {
                const newtoken = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
                headers['Authorization'] = `Bearer ${newtoken}`
                return await axios<ApiResponse<T>>({
                    method: method ?? "GET",
                    url: BASE_URL + ':8084' + url,
                    data: data,
                    headers: headers,
                    params
                });
            }
            else {
                showToast(err?.response?.data?.error, "error")
                removeLocalStorageItem(LOCALSTORAGE_KEY);
                removeLocalStorageItem('user')
                removeLocalStorageItem('Localhub')
                removeLocalStorageItem('Remotehub')
                removeLocalStorageItem('Remotetemphub')
                window.location.assign('/login');
            }
        }
       
        console.error(err, "err from protectApi");
        throw err;
    }
}


export const fetchRefreshToken = async () => {

    try {
        const res = await axios({ url: `${BASE_URL}:8084/refresh`, method: 'POST', withCredentials: true });
        console.log("Refresh API response:", res.status, res.data);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        setLocalStorageItem(LOCALSTORAGE_KEY, JSON.stringify({ token: res.data.access_token, expiresAt: expiresAt.toISOString() }))
        return true;

    } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr.message, refreshErr?.response?.data);
        return false;
    }
}




