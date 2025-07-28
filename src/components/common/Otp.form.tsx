import { InputField } from "../ui/Input.field";
import React from "react";
import Spinner from "../ui/Spinner";

export const OtpForm = ({
  onSubmit,
  otp,
  handleOnChange,
  isLoading,
  isError,
  error,
  canResendOtp,
  resendOtpTimer,
  resendOtp,
  handleOnKeyDown,
  handleOnPaste,
  isForgot,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isVerifyLoading
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  otp: string[];
  handleOnChange: (value: string, index: number) => void;
  isLoading: boolean;
  isError: boolean;
  error: string;
  canResendOtp: boolean;
  resendOtpTimer: string;
  resendOtp: () => void;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  handleOnPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  isForgot?: boolean,
  password?: string,
  setPassword?: (value:string) => void 
  showPassword?: boolean,
  setShowPassword?: (val: boolean) => void;
  isVerifyLoading: boolean
}) => {
  return (
    <div className="px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-2 xs:pb-2.5 sm:pb-3 md:pb-4">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 xs:mb-2.5 sm:mb-3 dark:text-white text-black">
        Enter OTP
      </h1>

      <form
        onSubmit={onSubmit}
        className="space-y-1.5 xs:space-y-2 sm:space-y-2.5"
      >
        {/* OTP Field */}
        <label className="block text-xs sm:text-sm text-black dark:text-white">OTP
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-black dark:text-white focus:outline-0  text-xl border-1 border-[#2B4C88] dark:border-white rounded"
              value={digit}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              onPaste={handleOnPaste}
            />
          ))}
        </div>
        {isForgot && 
          <InputField
          label="Password"
          placeholder="Enter password here..."
          isPasswordField 
          value={password?? ''}
          setValue={setPassword}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          />
        }
        {/* Error Message */}
        {isError && (
          <div className="text-red-500 text-[11px] xs:text-xs sm:text-sm text-center">
            {error}
          </div>
        )}

        {/* Register Button */}
        <button
        disabled={isVerifyLoading}
          type="submit"
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#2B4C88] hover:bg-blue-700 text-white text-sm sm:text-base rounded-full transition-colors"
        >
          {isVerifyLoading ? <Spinner/> :<span>{isForgot ? 'Verify & Change Password' : 'Verify'}</span> }
        </button>

        <button
          disabled={!canResendOtp && isLoading && isVerifyLoading}
          type="button"
          onClick={resendOtp}
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] dark:text-white  bg-[#F6F6F6] dark:bg-[var(--surface-300)] hover:bg-gray-100 text-gray-700 text-sm sm:text-base rounded-full transition-colors"
        >
          {isLoading ? <Spinner /> : (
            `Resend OTP${!canResendOtp ? ` (${resendOtpTimer})` : ""}`
          )}
        </button>
      </form>
    </div>
  );
};
