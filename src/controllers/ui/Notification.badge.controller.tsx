"use client";

import { NotificationBadge } from "@/components/ui/Notification.badge";
import { protectApi } from "@/lib/protectApi";
import axios from "axios";
import { useEffect, useState } from "react";

export const NotificationBadgeController = ({

}: {

  }) => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    const fetchNotificationsCount = async () => {

      console.log('noti')
      try {
        const res = await protectApi('/user/notification',)

        const data = res?.data.data;
        console.log(data.length);
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
