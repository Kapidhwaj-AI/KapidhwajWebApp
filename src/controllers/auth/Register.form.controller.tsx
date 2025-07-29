"use client";

import { RegisterForm } from "@/components/views/auth/Register.form";
import { setLocalStorageItem } from "@/lib/storage";
import { allowRegisterOtpAccess } from "@/redux/slices/authSlice";
import { setUserEmail, setUserPhone } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { apiBaseUrl } from "@/services/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { OtpFormController } from "./Otp.form.controller";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch<AppDispatch>();

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
      });

      if (res.status === 200) {
        toast.success("OTP sent successfully")
        dispatch(setUserEmail(email));
        dispatch(setUserPhone(phone));
        dispatch(allowRegisterOtpAccess());
        setLocalStorageItem('email', email)
        setIsOpen(true)
      }

    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error(error.response?.data?.message)
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
