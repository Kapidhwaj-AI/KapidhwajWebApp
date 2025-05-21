"use client";

import { handleLoginApi } from "@/services/auth";
import { setAuthToken, setIsRememberedMe } from "@/redux/slices/authSlice";
import { setUserRedux } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // for development
    setIsDarkMode(false)
    //
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await handleLoginApi(username, password);

    if (result?.success) {
      dispatch(setAuthToken(result.data.token));
      dispatch(setUserRedux(result.data.user));
      router.push('/home');
    } else {
      setError(result?.error || 'Login failed');
    }
  };

  return (
    <div className="w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
      {/* Logo Section */}
      <div className="flex justify-center pt-4 sm:pt-6 md:pt-8 pb-1 sm:pb-2">
        <Image
          src="/assets/images/logo-rectangle.png"
          alt="Kapidhwaj AI"
          width={252}
          height={117}
          className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[252px] h-auto"
          priority
        />
      </div>

      {/* Login Form */}
      <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
        {/* dark:text-white */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-5 md:mb-6 text-black ">Login</h1>
        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
          {/* Email/Phone Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm text-black dark:text-white">Email / Phone</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your phone / email here..."
              className="w-full h-[35px] sm:h-[40px] md:h-[45px] px-3 sm:px-4 text-sm sm:text-base bg-[#F6F6F6] hover:bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 rounded-xl"
              // rounded-full to rounded-xl for every input
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs sm:text-sm text-black dark:text-white">Password</label>
              <Link href="/forgot-password" className="text-xs sm:text-sm text-gray-500 hover:text-gray-700">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password here..."
              className="w-full h-[35px] sm:h-[40px] md:h-[45px] px-3 sm:px-4 text-sm sm:text-base bg-[#F6F6F6] hover:bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 rounded-xl"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#2B4C88] hover:bg-blue-700 text-white text-sm sm:text-base rounded-xl transition-colors"
          >
            Sign In
          </button>

          {/* OR Divider */}
          {/* <div className="relative py-2 sm:py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-sm text-gray-500 bg-[#F6F6F6] rounded-full p-4 md:p-5 border-white border-8">OR</span>
            </div>
          </div> */}

          {/* OR Divider */}
          <div className="flex items-center justify-between py-2">
            {/* Left Line */}
            <div className="flex-grow border-t border-gray-200 "></div>

            {/* OR Circle */}
            <div className="relative flex justify-center">
              <span className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-[10px] xs:text-xs sm:text-sm text-gray-500 bg-[#F6F6F6] rounded-full p-4 md:p-5 mx-5 md:mx-7">OR</span>
            </div>

            {/* Right Line */}
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#F6F6F6] hover:bg-gray-100 text-gray-700 text-sm sm:text-base rounded-xl transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
