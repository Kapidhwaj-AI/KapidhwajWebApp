import { Alert } from "@/models/alert";
import { IconClock, IconCalendar, IconMovie, IconTreadmill } from "@tabler/icons-react";
import Image from "next/image";
import { tabFilters } from "./AlertsFiltersButtonAtStream";

export function AlertCard({ alert }: { alert?: Alert }) {
    const alertTimestamp = new Date(alert?.timestamp ?? ''); // Assuming 'data' is your alert object
    const formattedDate = alertTimestamp.toLocaleDateString("en-GB"); // e.g. "24/10/2025"
    const formattedTime = alertTimestamp.toLocaleTimeString("en-GB", {
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <div className="w-full bg-[var(--surface-200)] rounded-4xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {/* <IconTreadmill className="text-gray-600 dark:text-gray-400" size={20} /> */}
                        {tabFilters.find((item) => item.value === alert?.alertType)?.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xs">{alert?.alertType}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{alert?.camera?.name} </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-right text-xs mr-3">
                    <div className="flex items-center gap-1">
                        <IconCalendar size={14} />
                        <span className="text-gray-500 dark:text-gray-400">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconClock size={14} />
                        <span className="text-gray-500 dark:text-gray-400">{formattedTime}</span>
                    </div>
                </div>
            </div>

            {/* Image Area */}
            <div className="relative aspect-video m-4 rounded-xl flex items-center justify-center"
                >
                    {alert?.frame_url && <Image src={alert?.frame_url} alt={alert?.alertType ?? alert.alertType} width={1000} height={1000} className="object-cover rounded-2xl"/>}
                {/* Center Circle Icon */}
                <div className="absolute h-16 w-16 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <IconMovie stroke={2} className="text-gray-600 dark:text-gray-300" size={24} />
                </div>
            </div>
        </div>
    );
}