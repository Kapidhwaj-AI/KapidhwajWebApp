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
      if (isValid) {
        removeLocalStorageItem('kapi-token')
        removeLocalStorageItem('hub')
        router.push('/login');
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 30000);

    return () => clearInterval(interval);
  }, []);
 
  return null;
}
