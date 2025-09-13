
import { Notification } from '@/models/notification';
import { getNotificationStyle } from '@/utils/notification';
const IconBellFilled = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBellFilled),
    { ssr: false });

const IconSparkles = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconSparkles),
    { ssr: false });
import clsx from 'clsx';
import dynamic from 'next/dynamic';

export default function NotificationCard({ notification }: { notification: Notification }) {
    const { id, title, message, type, seen } = notification;
    const notificationType = getNotificationStyle(type);
    return (
        <div
            key={id}
            className="relative flex items-center justify-between p-5 border rounded-4xl border-[var(--surface-600)] bg-[var(--surface-500)]"
        >
            <div className="flex items-center space-x-4">
                <div className={clsx('p-5 rounded-full', notificationType)}>
                    <IconBellFilled size={30} stroke={2} />
                </div>
                <div>
                    <h3 className="text-md font-semibold">{title}</h3>
                    <p className="text-gray-600 text-sm">{message}</p>
                </div>
            </div>
            {!seen && (
                <div className="absolute top-0 right-10 flex items-center space-x-2 bg-[#2B4C88] text-white px-3 py-1 rounded-b-xl text-xs">
                    <IconSparkles stroke={2} className="w-4 h-4" />
                    <span>New</span>
                </div>
            )}
        </div>
    );
}
