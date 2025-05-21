"use client";

import { NotificationBadge } from "@/components/ui/Notification.badge";
import axios from "axios";
import { useEffect, useState } from "react";

export const NotificationBadgeController = () => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    const fetchNotificationsCount = async () => {
      const res = await axios({
        method: "GET",
        url: "/api/user/notifications/count",
      });

      const data = res.data.data;
      console.log(data);
      setNotificationsCount(data.count);
    };

    fetchNotificationsCount();
  }, []);

  return <NotificationBadge value={notificationsCount} />;
};
