'use client'
import ForgotForm from '@/components/views/auth/Forgot.form';
import { apiBaseUrl } from '@/services/config';
import axios from 'axios';
import React, {  useState } from 'react'
import { OtpFormController } from './Otp.form.controller';
import { toast } from 'react-toastify';

const ForgotFormController = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setError("");
        try {
            const key = emailRegex.test(value)
                ? "email"
                : "phone"

            const res = await axios({
                method: 'POST', data: {
                    [key]: value
                },
                url: `${apiBaseUrl}/sendOTP`,
            })
            if (res.status === 200) {
                toast.success("OTP sent successfully")
                setIsOpen(true)
            }
            
        } catch (error) {
            setIsError(true);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message || "An error occurred during login"
                );
                toast.error(error.response?.data?.message)
            } else {
                setError("An unexpected error occurred");
            }
        }
        finally{
            setIsLoading(false)
        }
       
    }


    return (
        <>
            <ForgotForm onSubmit={handleSendOtp} value={value} setValue={setValue} isError={isError} isLoading={isLoading} error={error}  />
            {isOpen && <OtpFormController setPassword={setPassword} setShowPassword={setShowPassword} password={password} showPassword={showPassword} isForgot value={value} setIsOpen={setIsOpen} resend='/sendOTP' verify='/changePassword' backKey={emailRegex.test(value)
                ? "email"
                : "phone"} />}
        </>
    )
}

export default ForgotFormController