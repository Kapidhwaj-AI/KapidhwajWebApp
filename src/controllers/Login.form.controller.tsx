"use client";

import { LoginForm } from "@/components/Login.form";
import { setAuthToken } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { LOCALSTORAGE_KEY } from "@/services/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const LoginFormController = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const phoneRegex = /^[0-9]{7,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

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
        url: "/api/login",
        data: {
          [key]: username,
          password,
        },
      });

      if (res.status === 200) {
        // const expiresAt = new Date();
        // expiresAt.setDate(expiresAt.getDate() + 7);

        // localStorage.setItem(
        //   LOCALSTORAGE_KEY,
        //   JSON.stringify({
        //     token: res.data.token,
        //     expiresAt: expiresAt.toISOString(),
        //   })
        // );

        // dispatch(setAuthToken(res.data.token));

        router.replace("/home");
      }
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred during login"
        );
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
      redirectRegister={handleRegisterRedirect}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  );
};
