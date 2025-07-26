import { LoginFormController } from "@/controllers/auth/Login.form.controller";

const Login = () => {
  return (
    <div className="w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
      <LoginFormController />
    </div>
  );
};

export default Login;
