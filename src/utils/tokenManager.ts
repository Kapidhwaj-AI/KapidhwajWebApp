import { getLocalStorageItem } from "@/lib/storage"

export const checkLocalToken = (): boolean => {
    try {
        const tokenData = JSON.parse(getLocalStorageItem("kapi-token") ?? "{}");

        const expiration = tokenData?.expiresAt;
        const token = tokenData?.token
        if (!expiration || !token) return true; 

        const now = new Date();
        const expiryDate = new Date(expiration);

        const isExpired = expiryDate.getTime() <= now.getTime();
        return isExpired;
    } catch (err) {
        console.error("Error parsing token expiration", err);
        return true; // Default to expired if there's a parsing issue
    }
};
