'use client'
import Link from "next/link";

export const InputField = ({
  label,
  placeholder,
  value,
  setValue,
  isPasswordField = false,
  showPassword = false,
  setShowPassword,
  showForgotPasswordLabel = false,
  forgotPasswordLabel = "Forgot Password?",
 
  required = false,
  isOtp,
  setOtp,
  index,
  handleOnKeyDown,
  handleOnPaste, type, disabled
}: {
  label?: string;
  placeholder?: string;
  value: string | number;
  setValue?: (value: string) => void;
  isPasswordField?: boolean;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
  showForgotPasswordLabel?: boolean;
  forgotPasswordLabel?: string;
  required?: boolean;
  isOtp?: boolean,
  setOtp?: (value: string, index?: number) => void
  index?: number;
  handleOnKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, index?: number) => void;
  handleOnPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  type?: string,
  disabled?:boolean 
}) => {

  return (
    <div className="space-y-1.5 w-full  sm:space-y-2">
      {isPasswordField && showForgotPasswordLabel ? (
        <div className="flex justify-between items-center">
          {label && <label htmlFor={`${label.toLowerCase()}`} className="block text-start text-xs sm:text-sm text-black dark:text-white">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>}
          <Link href={'/forgot-password'}
            className="text-xs sm:text-sm hover:underline text-gray-500 hover:text-gray-700"
          >
            {forgotPasswordLabel}
          </Link>
        </div>
      ) : (
        label && <label className="block text-xs text-start sm:text-sm text-black dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">

        <input id={isOtp ? `otp-${index}` : `${label?.toLowerCase()}`}
          type={isPasswordField ? (showPassword ? 'text' : 'password') : type ??'text'}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            const newValue = isOtp ? e.target.value.replace(/\D/g, '') : e.target.value;
            if (isOtp && setOtp) {
              setOtp(newValue, index);
            } else if (setValue) {
              setValue(newValue);
            }
          }}
          required={required}
          placeholder={placeholder}
          onKeyDown={(e) => handleOnKeyDown && handleOnKeyDown(e, index)}
          onPaste={handleOnPaste}
          maxLength={isOtp ? 1 : undefined}
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] p-2 px-4 bg-transparent z-50 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  rounded-full border-none focus:outline-none ring-2 ring-[#2B4C88] text-gray-600 dark:text-white"
        />
        {isPasswordField && setShowPassword && <button type="button" className="absolute inset-y-0 cursor-pointer top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 dark:text-white"
            >
              <path
                stroke="currnetColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>}
      </div>
    </div>
  );
};
