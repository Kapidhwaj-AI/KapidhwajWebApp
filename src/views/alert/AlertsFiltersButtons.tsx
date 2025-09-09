import React from "react";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";
import { Dumbbell, LayoutDashboard, ChevronRight, Users, ScanFace, BadgeCheck, FireExtinguisher, } from "lucide-react";

const AlertsFiltersButtons = ({ selectedTab, setSelectedTab }: { selectedTab: string, setSelectedTab: (value: string) => void }) => {
    const t = useTranslations()
    const tabFilters = [
        { id: 0, label: `${t("alerts.all")}`, value: 'all', icon: <LayoutDashboard fill="currentColor" stroke={'10'} /> },
        { id: 1, label: `${t("alerts.intrusion_detection")}`, value: 'INTRUSION_DETECTION', icon: <Dumbbell fill="currentColor" stroke={'2'} /> },
        { id: 2, label: `${t("alerts.motion_detection")}`, value: 'MOTION_DETECTION', icon: <ChevronRight fill="currentColor" stroke={'2'} /> },
        { id: 3, label: `${t("alerts.people_count")}`, value: 'PEOPLE_COUNT', icon: <Users fill="currentColor" stroke={'2'} /> },
        { id: 4, label: `${t("alerts.face_detection")}`, value: 'FACE_DETECTION', icon: <ScanFace fill="currentColor" stroke={'2'} /> },
        { id: 5, label: `${t("alerts.license_plate_detection")}`, value: 'LICENSE_PLATE_DETECTION', icon: <BadgeCheck fill="currentColor" stroke={'2'} /> },
        { id: 6, label: `${t("alerts.fire_smoke_detection")}`, value: 'FIRE_SMOKE_DETECTION', icon: <FireExtinguisher fill="currentColor" stroke={'2'} /> },
    ];
    return (
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide w-full">
            {tabFilters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => setSelectedTab(filter.value)}
                    className={cn(
                        "flex items-center space-x-2 rounded-full px-1.5 py-1.5 transition-all w-full",
                        selectedTab === filter.value
                            ? "bg-[#2B4C88] text-white"
                            : "bg-[var(--surface-400)] text-[#888888]"
                    )}
                >
                    <div className={cn("p-1 md:p-2 lg:p-3 2xl:p-3.5 rounded-full",
                        selectedTab === filter.value
                            ? "text-black bg-white"
                            : " bg-[var(--surface-700)]")}>
                        {filter.icon}
                    </div>
                    <span className="text-xs md:text-xs lg:text-sm xl:text-md font-bold">{filter.label}</span>
                </button>
            ))
            }
        </div >
    );
};

export default AlertsFiltersButtons;