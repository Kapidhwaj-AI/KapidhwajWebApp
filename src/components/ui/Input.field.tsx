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
  forgotPasswordAction,
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  isPasswordField?: boolean;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
  showForgotPasswordLabel?: boolean;
  forgotPasswordLabel?: string;
  forgotPasswordAction?: () => void;
  required?: boolean;
}) => {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      {isPasswordField && showForgotPasswordLabel ? (
        <div className="flex justify-between items-center">
          <label className="block text-xs sm:text-sm text-black">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <span
            onClick={forgotPasswordAction}
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700"
          >
            {forgotPasswordLabel}
          </span>
        </div>
      ) : (
        <label className="block text-xs sm:text-sm text-black">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[35px] sm:h-[40px] md:h-[45px] px-3 sm:px-4 text-sm sm:text-base bg-[#F6F6F6] text-black hover:bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
