"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { singupUser } from "@/services/auth";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await singupUser(formData);
            if (response?.success) {
                console.log(response);

                setIsSuccess(true);
            } else {
                console.log(response);
                setIsError(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error.response);

            setIsError(true);
            setIsLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // TODO: Implement registration API call
            console.log('Registration data:', formData);
            router.push('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="w-full bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden">
            {/* Logo Section */}
            <div className="flex justify-center pt-2 xs:pt-2.5 sm:pt-3 md:pt-4 lg:pt-5 pb-0.5 xs:pb-1 sm:pb-1.5">
                <Image
                    src="/assets/images/logo-rectangle.png"
                    alt="Kapidhwaj AI"
                    width={252}
                    height={117}
                    className="w-[140px] xs:w-[150px] sm:w-[170px] md:w-[190px] lg:w-[210px] h-auto"
                    priority
                />
            </div>

            {/* Registration Form */}
            <div className="px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-2 xs:pb-2.5 sm:pb-3 md:pb-4">
                <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 xs:mb-2.5 sm:mb-3">Register</h1>
                <form onSubmit={onSubmit} className="space-y-1.5 xs:space-y-2 sm:space-y-2.5">
                    {/* First Name Field */}
                    <div className="space-y-0.5 xs:space-y-1">
                        <label className="block text-[11px] xs:text-xs sm:text-sm">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name..."
                            className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] px-2.5 xs:px-3 sm:px-3.5 text-xs xs:text-sm bg-[#F6F6F6] hover:bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* User Name Field */}
                    <div className="space-y-0.5 xs:space-y-1">
                        <label className="block text-[11px] xs:text-xs sm:text-sm">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your last name..."
                            className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] px-2.5 xs:px-3 sm:px-3.5 text-xs xs:text-sm bg-[#F6F6F6] hover:bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-0.5 xs:space-y-1">
                        <label className="block text-[11px] xs:text-xs sm:text-sm">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number..."
                            className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] px-2.5 xs:px-3 sm:px-3.5 text-xs xs:text-sm bg-[#F6F6F6] hover:bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-0.5 xs:space-y-1">
                        <label className="block text-[11px] xs:text-xs sm:text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] px-2.5 xs:px-3 sm:px-3.5 text-xs xs:text-sm bg-[#F6F6F6] hover:bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-0.5 xs:space-y-1">
                        <label className="block text-[11px] xs:text-xs sm:text-sm">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password..."
                            className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] px-2.5 xs:px-3 sm:px-3.5 text-xs xs:text-sm bg-[#F6F6F6] hover:bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 text-[11px] xs:text-xs sm:text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Register Button */}
                    <button
                        disabled={isLoading}
                        onClick={handleRegister}
                        className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] bg-[#2B4C88] hover:bg-blue-700 text-white text-xs xs:text-sm rounded-full transition-colors"
                    >
                        Register
                    </button>

                    {/* OR Divider */}
                    <div className="relative py-1 xs:py-1.5 sm:py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-[10px] xs:text-xs sm:text-sm text-gray-500 bg-[#F6F6F6] rounded-full">OR</span>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="w-full h-[28px] xs:h-[30px] sm:h-[32px] md:h-[35px] lg:h-[38px] bg-[#F6F6F6] hover:bg-gray-100 text-gray-700 text-xs xs:text-sm rounded-full transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
} 