"use client";

import { RegisterFormController } from "@/controllers/auth/Register.form.controller";

export default function Register() {
  return (
    <div className="w-full bg-white rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden">
      {/* Registration Form */}
      <RegisterFormController />
    </div>
  );
}
