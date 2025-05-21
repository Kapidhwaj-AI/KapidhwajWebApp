import { API_BASE_URL } from "@/app/api/config";
import { USER_TOKEN_COOKIE } from "@/services/config";
import axios from "axios";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get(USER_TOKEN_COOKIE);

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized", reason: "error" },
      { status: 401 }
    );
  }

  try {
    const res = await axios({
      method: "GET",
      url: `${API_BASE_URL}/user/notification`,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const notifications = res.data.data || [];

    // Count notifications where seen is false
    const unreadCount = notifications.filter(
      (notification) => !notification.seen
    ).length;

    return NextResponse.json({
      data: { count: unreadCount },
      message: "Unread notifications count",
      reason: "OK",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || "Failed to fetch notifications",
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
