"use client";
import { RegisterForm } from "@/views/auth/Register.form";
import { setLocalStorageItem } from "@/lib/storage";
import { apiBaseUrl } from "@/services/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const OtpFormController = dynamic(() => import('./Otp.form.controller').then((mod) => mod.OtpFormController))
import { showToast } from "@/lib/showToast";
import dynamic from "next/dynamic";
import { RootActions, useStore } from "@/store";
export const RegisterFormController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter();
  const allowRegisterOtpAccess = useStore((state: RootActions) => state.allowRegisterOtpAccess);
  const setUserEmail = useStore((state: RootActions) => state.setUserEmail);
  const setUserPhone = useStore((state: RootActions) => state.setUserPhone);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError("");
    try {
      const res = await axios({
        method: "POST",
        url: `${apiBaseUrl}/signup`,
        data: { name: `${firstName} ${lastName}`, username, phone, email, password },
        withCredentials: true
      });

      if (res.status === 200) {
        showToast("OTP sent successfully", "success")
        setUserEmail(email)
        setUserPhone(phone)
        allowRegisterOtpAccess()
        setLocalStorageItem('email', email)
        setIsOpen(true)
      }

    } catch (error) {
      console.error(error);
      setIsError(true);
      showToast(error.response?.data?.message, "error")
      setError(error.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <>
      <RegisterForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        username={username}
        setUsername={setUsername}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isError={isError}
        error={error}
        redirectLogin={handleLoginRedirect}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
      />
      {isOpen && <OtpFormController value={email} setIsOpen={setIsOpen} resend='/register/resendOTP' verify='/register' backKey={"email"} />}
    </>
  );
};
