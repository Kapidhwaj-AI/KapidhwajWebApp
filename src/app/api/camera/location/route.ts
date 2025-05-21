import { API_BASE_URL } from "../../config";
import { USER_TOKEN_COOKIE } from "@/services/config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get(USER_TOKEN_COOKIE);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cameraId = req.nextUrl.searchParams.get("cameraId");

  const res = await axios({
    method: "GET",
    url: `${API_BASE_URL}/camera/cam-details`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      cameraId,
    },
  });

  return NextResponse.json(res.data);
};
