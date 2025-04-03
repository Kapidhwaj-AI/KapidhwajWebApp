'use client';

import { IconBell, IconBellFilled, IconSparkles } from '@tabler/icons-react';
import clsx from 'clsx';
const notificationTypes = {
    danger: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    alert: 'bg-blue-100 text-blue-600',
    common: 'bg-[#E5F3EA] text-[#56CE40]',
};

export default function NotificationCard({ notification }: { notification: any }) {
    const { id, title, description, type, seen } = notification;
    return (
        <div
            key={id}
            className="relative flex items-center justify-between p-5 border rounded-4xl border-[var(--surface-600)] bg-[var(--surface-500)]"
        >
            <div className="flex items-center space-x-4">
                <div className={clsx('p-5 rounded-full', notificationTypes[type])}>
                    <IconBellFilled size={30} stroke={2} />
                </div>
                <div>
                    <h3 className="text-md font-semibold">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
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
