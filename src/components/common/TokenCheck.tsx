"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// import { checkTokenExpiration } from '@/utils/tokenManager';

export function TokenCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      // const isValid = await checkTokenExpiration();
      // if (!isValid) {
      //     router.push('/login');
      // }
    };

    // Check token on mount
    checkToken();

    // Set up interval to check token every 30 seconds
    const interval = setInterval(checkToken, 30000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [router]);

  return null;
}
