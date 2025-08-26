'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { getLocalStorageItem, removeLocalStorageItem } from '@/lib/storage'

export default function RootRedirector() {
  const router = useRouter()
  const token = getLocalStorageItem('kapi-token')

  useEffect(() => {
    if (token) router.push('/streams')
    else {
      removeLocalStorageItem('hub')
      router.push('/login')
    }
  }, [token, router])



  return (
    <div className="min-h-screen grid place-items-center bg-gray-200">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <p className="text-gray-600">Loading application...</p>
      </div>
    </div>
  );
}