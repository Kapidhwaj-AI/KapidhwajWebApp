import { InputField } from "./ui/Input.field";
import React from "react";

export const RegisterOtpForm = ({
  onSubmit,
  otp,
  setOtp,
  isLoading,
  isError,
  error,
  canResendOtp,
  resendOtpTimer,
  resendOtp,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  otp: string;
  setOtp: (otp: string) => void;
  isLoading: boolean;
  isError: boolean;
  error: string;
  canResendOtp: boolean;
  resendOtpTimer: string;
  resendOtp: () => void;
}) => {
  return (
    <div className="px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 pb-2 xs:pb-2.5 sm:pb-3 md:pb-4">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 xs:mb-2.5 sm:mb-3 text-black">
        Enter OTP
      </h1>

      <form
        onSubmit={onSubmit}
        className="space-y-1.5 xs:space-y-2 sm:space-y-2.5"
      >
        {/* OTP Field */}
        <InputField
          label="OTP"
          placeholder="Enter your otp..."
          value={otp}
          setValue={setOtp}
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
          Verify
        </button>

        <button
          disabled={!canResendOtp}
          type="button"
          onClick={resendOtp}
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#F6F6F6] hover:bg-gray-100 text-gray-700 text-sm sm:text-base rounded-full transition-colors"
        >
          Resend OTP {!canResendOtp ? `(${resendOtpTimer})` : ""}
        </button>
      </form>
    </div>
  );
};
