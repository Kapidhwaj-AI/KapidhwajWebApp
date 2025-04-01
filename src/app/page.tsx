'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthToken } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { log } from 'console'

export default function RootRedirector() {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    token ? router.push('/home') : router.push('/login')
  }, [token])
  // const dispatch = useDispatch<AppDispatch>()
  // const router = useRouter()
  // const { token, isInitialized } = useSelector((state: RootState) => state.auth)

  // useEffect(() => {
  //   // Sync cookie with Redux
  //   const cookieToken = document.cookie
  //     .split('; ')
  //     .find(row => row.startsWith('auth-token='))
  //     ?.split('=')[1]

  //   dispatch(setAuthToken(cookieToken || null))
  // }, [dispatch])

  // useEffect(() => {
  //   if (isInitialized) {
  //     token ? router.push('/home') : router.push('/login')
  //   }
  // }, [token, isInitialized])
  console.log("app-page");

  return (
    <div className="min-h-screen grid place-items-center bg-gray-200">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <p className="text-gray-600">Loading application...</p>
      </div>
    </div>
  );
}