"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/common/Searchbar";
import NotificationCard from "@/components/notificaiton/NotificationCard";
import { IconFilter } from "@tabler/icons-react";
import { useNotifications } from "@/hooks/useNotifications";
import { useInView } from "react-intersection-observer";

// { id: 1, title: 'Security Alert', description: 'Unusual login attempt detected.', type: 'danger', seen: false },

export default function Notifications() {
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [allNotifications, setAllNotifications] = useState<any[]>([]);

  const { data: notifications = [], isLoading, error } = useNotifications(offset, {
    onSuccess: (data) => {
      console.log("NotificationData received in onSuccess:", data);
      if (data && data.length > 0) {
        setAllNotifications(prev => [...prev, ...data]);
      }
    }
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Fetch more data when the last element is in view
  useEffect(() => {
    if (inView && !isLoading && notifications.length === 10) {
      console.log("Fetching more notifications, current offset:", offset);
      setOffset(prev => prev + 10);
    }
  }, [inView, isLoading, notifications.length, offset]);

  const filteredNotifications = allNotifications.filter(notification =>
    !searchQuery ||
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // console.log("Notifications", filteredNotifications);

  return (
    <div className="h-full flex flex-col gap-4 min-h-0 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notification</h1>
        <div className="flex justify-between items-center gap-4">
          <SearchBar
            search={searchQuery}
            setSearch={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Notification"
          />
          <div className="bg-[var(--surface-100)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full flex items-center gap-1">
            <IconFilter stroke={2} />
            <span>Filters</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-5">
        <div className="grid grid-cols-1 gap-6 min-h-min md:grid-cols-3">
          {isLoading && allNotifications.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">Loading notifications...</div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">Error loading notifications: {error.message}</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No notifications found</div>
          ) : (
            <>
              {filteredNotifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
              <div ref={ref} className="col-span-full h-10">
                {isLoading && allNotifications.length > 0 && (
                  <div className="text-center text-gray-500">Loading more notifications...</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
