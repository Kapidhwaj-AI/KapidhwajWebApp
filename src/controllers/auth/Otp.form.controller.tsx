"use client";

import Modal from "@/components/ui/Modal";
import { OtpForm } from "@/components/common/Otp.form";
import { removeLocalStorageItem, setLocalStorageItem } from "@/lib/storage";
import { setAuthToken } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { apiBaseUrl, LOCALSTORAGE_KEY } from "@/services/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { protectApi } from "@/lib/protectApi";
import { toast } from "react-toastify";

export const OtpFormController = ({ value, backKey, verify, resend, setIsOpen, isForgot, password, showPassword, setShowPassword, setPassword, isProtected, }: { value: string, backKey: string, verify: string, resend: string; setIsOpen: (value: boolean) => void; isForgot?: boolean, password?: string, setPassword?: (value: string) => void; showPassword?: boolean; setShowPassword?: (val: boolean) => void; isProtected?: boolean; }) => {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendOtpTimer, setResendOtpTimer] = useState("01:30");
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds in total
  const [isVerifyLoading, setIsVerifyLoading] = useState(false)
  const handleOtpChange = (value: string, index: number,) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      document.getElementById(`otp-${newOtp.length - 1}`)?.focus();
    }
  };


  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResendOtp(true);
      setResendOtpTimer("00:00");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        const minutes = Math.floor(newTime / 60);
        const seconds = newTime % 60;
        setResendOtpTimer(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOtpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsVerifyLoading(true)
    setError('')
    try {
      const enteredOTP = otp.join("");
      const payload = { [backKey]: value, otp: Number(enteredOTP) }
      if ((isForgot || isProtected) && password) {
        payload.newPassword = password 
      }
      let res;
      if (isProtected) {
        res = await protectApi(verify, 'POST', payload, undefined, true)
      }
      else {
        res = await axios({
          method: 'POST',
          data: payload,
          url: `${apiBaseUrl + verify}`
        })
      }
      if (res.status === 201) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        setLocalStorageItem(LOCALSTORAGE_KEY, JSON.stringify({ token: res.data.token, expiresAt: expiresAt.toISOString() }))
        setLocalStorageItem('user', JSON.stringify(res.data.data))
        removeLocalStorageItem('email')
        dispatch(setAuthToken(res.data.token));
        toast.success("User created successfully")
        router.push('/home')



      }
      if (res.status === 200) {
        if (isForgot || isProtected) {
          toast.success("Password changed successfully")
          router.push('/login')
        }
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
    } finally {
      setIsVerifyLoading(false)
    }
  };

  const resendOtp = async () => {
    if (!canResendOtp) return;
    setIsLoading(true)
    try {
      const res = await axios({
        method: "POST",
        url: `${apiBaseUrl + resend}`,
        data: { [backKey]: value },
      });
      if (res.status === 200) {
        setTimeLeft(90);
        setCanResendOtp(false);
        setResendOtpTimer("01:30");
      }

    }
    catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred during login"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <Modal onClose={() => setIsOpen(false)}>
      <OtpForm
        isVerifyLoading={isVerifyLoading}
        showPassword={showPassword}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        password={password}
        isForgot={isForgot}
        canResendOtp={canResendOtp}
        resendOtpTimer={resendOtpTimer}
        resendOtp={resendOtp} isLoading={isLoading} isError={isError} error={error} onSubmit={handleOtpVerify} otp={otp} handleOnChange={handleOtpChange} handleOnKeyDown={handleOtpKeyDown} handleOnPaste={handleOtpPaste}
      />
    </Modal>
  );
};


///register/resendOTP /register