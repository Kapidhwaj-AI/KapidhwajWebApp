const NotificationBadge = dynamic(() => import('@/components/ui/Notification.badge').then((mod) => mod.NotificationBadge), {
  ssr: false,
});
import { protectApi } from "@/lib/protectApi";
import { showToast } from "@/lib/showToast";
import { Notification } from "@/models/notification";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export const NotificationBadgeController = () => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    const fetchNotificationsCount = async () => {

      try {
        const res = await protectApi<Notification[]>('/user/notification',)

        const data = res?.data.data;
        setNotificationsCount(data.length);
      } catch (error) {
        console.error("Error while fetching notifications", error)
        if (error instanceof AxiosError) {
          showToast(error.response?.data.error, "error")
        }
      } finally {
      }
    };

    fetchNotificationsCount();
  }, []);

  return <NotificationBadge value={notificationsCount} />;
};
