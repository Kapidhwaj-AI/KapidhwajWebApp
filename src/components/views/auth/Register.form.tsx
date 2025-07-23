import { InputField } from "../../ui/Input.field";
import React from "react";

export const RegisterForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isLoading,
  isError,
  error,
  redirectLogin,
  setShowPassword,
  showPassword
}: {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  username: string;
  setUsername: (username: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isError: boolean;
  error: string;
  redirectLogin: () => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) => {
  return (
    <div className="px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-2 xs:pb-2.5 sm:pb-3 md:pb-4">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 xs:mb-2.5 sm:mb-3 text-black">
        Create Account
      </h1>

      <form
        onSubmit={onSubmit}
        className="space-y-1.5 xs:space-y-2 sm:space-y-2.5"
      >
        {/* Name Field */}
        <div className="flex justify-between gap-4">
          <InputField
            label="First Name"
            placeholder="Enter your first name..."
            value={firstName}
            setValue={setFirstName}
            required
          />

          <InputField
            label="Last Name"
            placeholder="Enter your last name..."
            value={lastName}
            setValue={setLastName}
            required
          />
        </div>

        {/* Username Field */}
        <InputField
          label="Username"
          placeholder="Enter your username..."
          value={username}
          setValue={setUsername}
          required
        />

        {/* Phone Field */}
        <InputField
          label="Phone"
          placeholder="Enter your phone number..."
          value={phone}
          setValue={setPhone}
          required
        />

        {/* Email Field */}
        <InputField
          label="Email"
          placeholder="Enter your email..."
          value={email}
          setValue={setEmail}
          required
        />

        {/* Password Field */}
        <InputField
          label="Password"
          placeholder="Enter your password..."
          isPasswordField
          showForgotPasswordLabel={false}
          value={password}
          setValue={setPassword}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          required
        />

        {/* Error Message */}
        {isError && (
          <div className="text-red-500 text-[11px] xs:text-xs sm:text-sm text-center">
            {error}
          </div>
        )}

        {/* Register Button */}
        <button
          type="submit"
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#2B4C88] hover:bg-blue-700 text-white text-sm sm:text-base rounded-full transition-colors"
        >
          Register
        </button>

        {/* OR Divider */}
        <div className="relative py-2 sm:py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-sm text-gray-500 bg-[#F6F6F6] rounded-full">
              OR
            </span>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="button"
          onClick={redirectLogin}
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#F6F6F6] hover:bg-gray-100 text-gray-700 text-sm sm:text-base rounded-full transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
