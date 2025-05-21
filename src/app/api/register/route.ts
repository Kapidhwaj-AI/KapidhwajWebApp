import { API_BASE_URL, ApiResponse } from "../config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Request body type
interface SignupRequestBody {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

// Validation function
function validateSignupBody(body: unknown): body is SignupRequestBody {
  if (!body || typeof body !== "object") return false;

  const requiredFields = ["name", "username", "email", "phone", "password"];
  const hasAllRequiredFields = requiredFields.every((field) => {
    const value = (body as Record<string, unknown>)[field];
    return value && typeof value === "string";
  });

  if (!hasAllRequiredFields) return false;

  return true;
}

// Proxy API for signup

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validate request body
    if (!validateSignupBody(body)) {
      return NextResponse.json(
        {
          message:
            "Invalid request body. Please check all required fields and their formats.",
        },
        { status: 400 }
      );
    }

    const res = await axios({
      method: "POST",
      url: `${API_BASE_URL}/signup`,
      data: body,
    });

    const data: ApiResponse = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Registration failed",
          reason: "error",
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
        reason: "error",
      },
      { status: 500 }
    );
  }
};
