"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { checkLocalToken } from '@/utils/tokenManager';
import { removeLocalStorageItem } from "@/lib/storage";

export function TokenCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await checkLocalToken();
      console.log(isValid)
      if (isValid) {
        removeLocalStorageItem('kapi-token')
        router.push('/login');
      }
    };

    // Check token on mount
    checkToken();

    // Set up interval to check token every 30 seconds
    const interval = setInterval(checkToken, 30000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
 
  return null;
}
