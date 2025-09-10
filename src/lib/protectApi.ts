import axios, { isAxiosError, Method } from "axios";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "./storage";
import { apiBaseUrl, LOCALSTORAGE_KEY } from "@/services/config";

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export async function protectApi<T, D = undefined>(
    url: string,
    method: Method = "GET",
    data?: D,
    type?: string,
    isNotCustomHeader?: boolean,
    params?: unknown
) {
    const remoteHub = JSON.parse(getLocalStorageItem("Remotehub") ?? "{}");
    const localHub = JSON.parse(getLocalStorageItem("Localhub") ?? "{}");

    const hasRemoteHub = remoteHub && typeof remoteHub === "object" && "id" in remoteHub;
    const hasLocalHub = localHub && typeof localHub === "object" && "id" in localHub;

    const token = JSON.parse(getLocalStorageItem(LOCALSTORAGE_KEY) ?? "{}").token;

    let baseUrl = apiBaseUrl;
    if (hasRemoteHub) {
        baseUrl = apiBaseUrl;
    } else if (hasLocalHub) {
        baseUrl = `http://${localHub.id}.local:8084`;
    }

    const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        "Content-Type": type ?? "application/json",
    };
    if (hasRemoteHub && !isNotCustomHeader) {
        headers["x-hub-id"] = remoteHub.id;
    }

    try {
        const response = await axios<ApiResponse<T>>({
            method,
            url: baseUrl + url,
            data,
            headers,
            params
        });
        return response;
    } catch (err: unknown) {
        if (isAxiosError(err) && err?.response?.status === 401) {
            console.log("Token expired, trying refresh...");
            const refreshed = await fetchRefreshToken();

            if (refreshed) {
                const newToken = JSON.parse(getLocalStorageItem(LOCALSTORAGE_KEY) ?? "{}").token;
                headers["Authorization"] = `Bearer ${newToken}`;

                return await axios<ApiResponse<T>>({
                    method,
                    url: baseUrl + url,
                    data,
                    headers,
                });
            } else {
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
        const res = await axios.post(`${apiBaseUrl}/refresh`, {}, 
            { withCredentials: true }
        );
        console.log("Refresh API response:", res.status, res.data);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        setLocalStorageItem(
            LOCALSTORAGE_KEY,
            JSON.stringify({
                token: res.data.access_token,
                expiresAt: expiresAt.toISOString(),
            })
        );

        return true;
    } catch (refreshErr: unknown) {
        console.error("Refresh token failed:", refreshErr);
        
        return false;
    }
};
