import React from 'react'
import { InputField } from '../../ui/Input.field';
import Spinner from '@/components/ui/Spinner';


const ForgotForm = ({
  onSubmit,
  isLoading,
  isError,
  error = "",
  value,
  setValue,

}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center dark:text-white text-black mb-4 sm:mb-5 md:mb-6">
        Forgot Password
      </h1>

      <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
        {/* Email/Phone Field */}
        <InputField
          label="Email / Phone"
          placeholder="Enter your phone / email  here..."
          value={value}
          setValue={setValue}
        />



        {/* Error Message */}
        {isError && (
          <div className="text-red-500 text-xs sm:text-sm text-center">
            {error}
          </div>
        )}

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#2B4C88] hover:bg-blue-700 text-white text-sm sm:text-base rounded-full transition-colors"
        >
          {isLoading ? <Spinner /> : ' Send OTP'}
        </button>


      </form>

    </div>
  )
}

export default ForgotForm