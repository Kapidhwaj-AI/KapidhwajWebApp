import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, phone, otp } = await req.json();

  return NextResponse.json({ message: "OTP sent" });
};
