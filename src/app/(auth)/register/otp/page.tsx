import { RegisterOtpFormController } from "@/controllers/Register.otp.form.controller";

const RegisterOtp = () => {
  return (
    <div className="w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
      <RegisterOtpFormController />
    </div>
  );
};

export default RegisterOtp;
