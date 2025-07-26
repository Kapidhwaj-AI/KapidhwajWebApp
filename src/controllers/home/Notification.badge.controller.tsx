"use client";

import { NotificationBadge } from "@/components/ui/Notification.badge";
import { protectApi } from "@/lib/protectApi";
import { Notification } from "@/models/notification";
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
      } finally {
      }
    };

    fetchNotificationsCount();
  }, []);

  return <NotificationBadge value={notificationsCount} />;
};
