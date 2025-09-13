"use client";

import { LoginForm } from "@/views/auth/Login.form";
import { setLocalStorageItem } from "@/lib/storage";
import { LOCALSTORAGE_KEY } from "@/services/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RootActions, useStore } from "@/store";
import { showToast } from "@/lib/showToast";
import { BASE_URL } from "@/lib/protectApi";
export const LoginFormController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter();
  const setAuthToken = useStore((state:RootActions) => state.setAuthToken);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const phoneRegex = /^[0-9]{7,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError("");
    try {
      const key = emailRegex.test(username)
        ? "email"
        : phoneRegex.test(username)
          ? "phone"
          : "username";

      const res = await axios({
        method: "POST",
        url: `${BASE_URL}:8084/signin`,
        data: {
          [key]: username.trim(),
          password,
        },
      });

      if (res.status === 200) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        setLocalStorageItem([[LOCALSTORAGE_KEY, JSON.stringify({ token: res.data.access_token, expiresAt: expiresAt.toISOString() })], ['user', JSON.stringify(res.data.data)]])
        setAuthToken(res.data.access_token)
        window.location.href = "/home";
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred during login"
        );
        showToast(error.message,"error")
        console.error("Err:",error)
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isError={isError}
      error={error}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
    />
  );
};
