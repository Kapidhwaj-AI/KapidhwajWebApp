import { InputField } from "@/components/ui/Input.field";
import Spinner from "@/components/ui/Spinner";

export const LoginForm = ({
  onSubmit,
  isLoading,
  isError,
  error = "",
  redirectRegister,
  username,
  setUsername,
  password,
  setPassword,
  setShowPassword,
  showPassword,

}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  redirectRegister: () => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  setShowPassword: (value: boolean) => void;
  showPassword: boolean

}) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center dark:text-white text-black mb-4 sm:mb-5 md:mb-6">
        Login
      </h1>
      <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
        <InputField
          label="Email / Phone / Username"
          placeholder="Enter your phone / email / username here..."
          value={username}
          setValue={setUsername}
        />
        <InputField
          label="Password"
          placeholder="Enter password here..."
          isPasswordField
          value={password}
          setValue={setPassword}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />

        {isError && (
          <div className="text-red-500 text-xs sm:text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] bg-[#2B4C88] hover:bg-blue-700 text-white text-sm sm:text-base rounded-full transition-colors"
        >{isLoading ? <Spinner /> : 'Sign In'}
        </button>
        {/* <div className="flex items-center gap-3 py-2 sm:py-3">
          <div className="w-full bg-[var(--surface-300)]  h-[1px] dark:bg-white "></div>
          <span className="flex items-center justify-center text-xs sm:text-sm text-gray-500 dark:text-white   rounded-full">
            OR
          </span>
          <div className="w-full bg-[var(--surface-300)]  h-[1px] dark:bg-white"></div>
        </div> */}
        {/* <button
          type="button"
          onClick={redirectRegister}
          className="w-full h-[35px] sm:h-[40px] md:h-[45px] dark:text-white  bg-[#F6F6F6] dark:bg-[var(--surface-300)] hover:bg-gray-100 text-gray-700 text-sm sm:text-base rounded-full transition-colors"
        >
          Register
        </button> */}
      </form>
    </div>
  );
};
