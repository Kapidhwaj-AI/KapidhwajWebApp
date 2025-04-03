"use client";
import SearchBar from "@/components/common/Searchbar";
import NotificationCard from "@/components/notificaiton/NotificationCard";
import { IconFilter } from "@tabler/icons-react";


const notifications = [
  { id: 1, title: 'Security Alert', description: 'Unusual login attempt detected.', type: 'danger', seen: false },
  { id: 2, title: 'System Update', description: 'New version 2.7.3 is available.', type: 'alert', seen: false },
  { id: 3, title: 'Payment Reminder', description: 'Your subscription is due soon.', type: 'warning', seen: false },
  { id: 4, title: 'Welcome!', description: 'Thanks for signing up!', type: 'common', seen: false },
  { id: 5, title: 'New Message', description: 'You have received a new message.', type: 'alert', seen: false },
  { id: 6, title: 'Scheduled Maintenance', description: 'System maintenance scheduled for midnight.', type: 'warning', seen: true },
  { id: 7, title: 'Password Changed', description: 'Your password was successfully updated.', type: 'common', seen: true },
  { id: 8, title: 'Failed Payment', description: 'Your last payment attempt failed.', type: 'danger', seen: true },
  { id: 9, title: 'Account Verification', description: 'Please verify your email address.', type: 'alert', seen: true },
  { id: 10, title: 'Special Offer', description: 'Exclusive discount available for a limited time!', type: 'warning', seen: true },
  { id: 11, title: 'New Feature', description: 'Check out the latest feature update.', type: 'common', seen: true },
  { id: 12, title: 'System Downtime', description: 'Unexpected downtime detected.', type: 'danger', seen: true },
  { id: 13, title: 'Subscription Renewed', description: 'Your subscription has been renewed.', type: 'common', seen: true },
  { id: 14, title: 'Billing Issue', description: 'There was an issue with your billing information.', type: 'warning', seen: true },
  { id: 15, title: 'Friend Request', description: 'You have a new friend request.', type: 'alert', seen: true },
  { id: 16, title: 'New Comment', description: 'Someone commented on your post.', type: 'common', seen: true },
  { id: 17, title: 'Low Storage', description: 'Your storage is running low.', type: 'warning', seen: true },
  { id: 18, title: 'New Like', description: 'Your post received a new like.', type: 'alert', seen: true },
  { id: 19, title: 'Weekly Summary', description: 'Here is your weekly activity summary.', type: 'common', seen: true },
  { id: 20, title: 'Server Error', description: 'A server error has occurred.', type: 'danger', seen: true },
  { id: 21, title: 'System Reboot', description: 'The system was rebooted successfully.', type: 'alert', seen: true },
  { id: 22, title: 'Email Update', description: 'Your email has been updated.', type: 'common', seen: true },
  { id: 23, title: 'Security Tip', description: 'Enable 2FA for better security.', type: 'warning', seen: true },
  { id: 24, title: 'New Badge', description: 'You earned a new achievement badge.', type: 'alert', seen: true },
  { id: 25, title: 'Data Breach', description: 'Potential data breach detected.', type: 'danger', seen: true },
];
export default function Notifications() {
  console.log("app-home-page");

  return (
    <div className="h-full flex flex-col gap-4 min-h-0 p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notification</h1>
        <div className="flex justify-between items-center gap-4">
          <SearchBar search="" setSearch={() => { }} placeholder="Search Notification" />
          <div className="bg-[var(--surface-100)] text-md hover:bg-gray-50 text-[#888888] font-medium py-2 px-4 rounded-full flex items-center gap-1">
            <IconFilter stroke={2} />
            <span>Filters</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-5">
        <div className="grid grid-cols-1 gap-6 min-h-min md:grid-cols-3">

          {notifications.map(notification => <NotificationCard notification={notification} />)}
        </div>
      </div>
    </div >
  );
}
