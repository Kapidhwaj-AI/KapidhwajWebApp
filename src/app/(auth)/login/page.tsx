"use client";

import { handleLoginApi } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setAuthToken, setIsRememberedMe } from "@/redux/slices/authSlice";
import { setUserRedux } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";



export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await handleLoginApi(username, password)

    if (result?.success) {
      // Update Redux state
      dispatch(setAuthToken(result.data.token))
      dispatch(setUserRedux(result.data.user))

      // Client-side redirect
      router.push('/home')
    } else {
      setError(result?.error || 'Login failed')
    }
  }
  console.log("app-login-page");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>

            {/* Password Field */}
            <div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
