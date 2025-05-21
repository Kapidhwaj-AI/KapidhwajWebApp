import { API_BASE_URL, ApiResponse } from "../config";
import { User } from "@/models/user";
import { USER_TOKEN_COOKIE } from "@/services/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Request body type
interface LoginRequestBody {
  email?: string;
  phone?: string;
  username?: string;
  password: string;
}

// Response type
interface LoginResponse extends ApiResponse {
  token: string;
  data: User;
}

// Validation function
function validateLoginBody(body: unknown): body is LoginRequestBody {
  if (!body || typeof body !== "object") return false;

  const typedBody = body as Record<string, unknown>;

  // Password is required
  if (!typedBody.password || typeof typedBody.password !== "string")
    return false;

  // At least one of email, phone, or username must be present
  const hasEmail = typedBody.email && typeof typedBody.email === "string";
  const hasPhone = typedBody.phone && typeof typedBody.phone === "string";
  const hasUsername =
    typedBody.username && typeof typedBody.username === "string";

  return Boolean(hasEmail || hasPhone || hasUsername);
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Validate request body
    if (!validateLoginBody(body)) {
      return NextResponse.json(
        {
          message: "Invalid request body. Required fields missing or invalid.",
        },
        { status: 400 }
      );
    }

    const res = await axios({
      method: "POST",
      url: `${API_BASE_URL}/signin`,
      data: body,
    });

    const data: LoginResponse = res.data;

    // Create response with data
    const response = NextResponse.json(data, { status: res.status });

    // Set auth token cookie
    response.cookies.set({
      name: USER_TOKEN_COOKIE,
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Authentication failed",
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
