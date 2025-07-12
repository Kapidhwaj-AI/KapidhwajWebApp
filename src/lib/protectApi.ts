import axios from "axios"
import { getLocalStorageItem } from "./storage"
import { apiBaseUrl } from "@/services/config"

const token = JSON.parse(getLocalStorageItem('kapi-token') ?? '{}')?.token
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}
type Payload = { cameraId: number } | { cameraId: number, serviceType: string } | { camId: number}
export const protectApi = async (url: string, method?:string, data?:Payload) => {
    return axios<ApiResponse<any>>({
        method: method ?? 'GET',
        url: apiBaseUrl + url,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

