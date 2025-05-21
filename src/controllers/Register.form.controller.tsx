"use client";

import { RegisterForm } from "@/components/Register.form";
import { allowRegisterOtpAccess } from "@/redux/slices/authSlice";
import { setUserEmail, setUserPhone } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const RegisterFormController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        url: "/api/register",
        data: { name, username, phone, email, password },
      });

      if (res.status === 200) {
        dispatch(setUserEmail(email));
        dispatch(setUserPhone(phone));
        dispatch(allowRegisterOtpAccess());

        router.push("/register/otp");
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <RegisterForm
      name={name}
      setName={setName}
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
    />
  );
};
