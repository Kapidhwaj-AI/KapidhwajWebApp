"use client";

import { RegisterOtpForm } from "@/components/Register.otp.form";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const RegisterOtpFormController = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const { email, phone } = useSelector((state: RootState) => state.user);
  const { registerOtpAccess } = useSelector((state: RootState) => state.auth);

  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendOtpTimer, setResendOtpTimer] = useState("01:30");
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds in total

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResendOtp(true);
      setResendOtpTimer("00:00");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        // Format time as MM:SS
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const resendOtp = () => {
    if (!canResendOtp) return;

    // Reset timer
    setTimeLeft(90);
    setCanResendOtp(false);
    setResendOtpTimer("01:30");

    // TODO: Implement OTP resend logic here
  };

  return (
    <RegisterOtpForm
      onSubmit={handleSubmit}
      otp={otp}
      setOtp={setOtp}
      isLoading={isLoading}
      isError={isError}
      error={error}
      canResendOtp={canResendOtp}
      resendOtpTimer={resendOtpTimer}
      resendOtp={resendOtp}
    />
  );
};
