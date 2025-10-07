import React from "react";
import { cn } from "@/lib/utils";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
const IconBounceRight = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconBounceRight),
    { ssr: false });
const IconFireExtinguisher = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFireExtinguisher),
    { ssr: false });
const IconFriends = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconFriends),
    { ssr: false });

const IconLayoutDashboard = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLayoutDashboard),
    { ssr: false });
const IconLicense = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconLicense),
    { ssr: false });

const IconUserScan = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconUserScan),
    { ssr: false });
const IconTreadmill = dynamic(() => import("@tabler/icons-react").then((mod) => mod.IconTreadmill),
    { ssr: false });
const AlertsFiltersButtons = ({ selectedTab, setSelectedTab }: { selectedTab: string, setSelectedTab: (value: string) => void }) => {
    const t = useTranslations()
    const tabFilters = [
        { id: 0, label: `${t("alerts.all")}`, value: 'all', icon: <IconLayoutDashboard  stroke={'2'} /> },
        { id: 1, label: `${t("alerts.intrusion_detection")}`, value: 'INTRUSION_DETECTION', icon: <IconTreadmill stroke={'2'} /> },
        { id: 2, label: `${t("alerts.motion_detection")}`, value: 'MOTION_DETECTION', icon: <IconBounceRight  stroke={'2'} /> },
        { id: 3, label: `${t("alerts.people_count")}`, value: 'PEOPLE_COUNT', icon: <IconFriends  stroke={'2'} /> },
        { id: 4, label: `${t("alerts.face_detection")}`, value: 'FACE_DETECTION', icon: <IconUserScan  stroke={'2'} /> },
        { id: 5, label: `${t("alerts.license_plate_detection")}`, value: 'LICENSE_PLATE_DETECTION', icon: <IconLicense  stroke={'2'} /> },
        { id: 6, label: `${t("alerts.fire_smoke_detection")}`, value: 'FIRE_SMOKE_DETECTION', icon: <IconFireExtinguisher  stroke={'2'} /> },
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