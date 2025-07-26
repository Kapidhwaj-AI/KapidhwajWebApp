import { API_BASE_URL, ApiResponse, UserDetails } from "../config";
import { USER_TOKEN_COOKIE } from "@/services/config";
import axios from "axios";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface UserResponse extends ApiResponse {
  data: UserDetails;
}

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get(USER_TOKEN_COOKIE);
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized", reason: "error" },
      { status: 401 }
    );
  }

  const res = await axios({
    method: "GET",
    url: `${API_BASE_URL}/user`,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const data: UserResponse = res.data;

  return NextResponse.json(data);
};
