import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IconAlertCircle, IconBounceRight, IconFriends, IconListDetails, IconRun, IconTreadmill, IconUsers } from "@tabler/icons-react";

const filters = [
    { id: "all", label: "All Alerts", icon: <IconListDetails stroke={2} /> },
    { id: "intrusions", label: "Intrusions", icon: <IconTreadmill stroke={2} /> },
    { id: "motion", label: "Motion", icon: <IconBounceRight stroke={2} /> },
    { id: "people", label: "People", icon: <IconFriends stroke={2} /> },
];

const AlertsFiltersButtons = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");

    return (
        <div className="flex space-x-4 w-8/12">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={cn(
                        "flex items-center space-x-2 rounded-full px-2 py-2 transition-all w-full",
                        selectedFilter === filter.id
                            ? "bg-[#2B4C88] text-white"
                            : "bg-[var(--surface-400)] text-[#888888]"
                    )}
                >
                    <div className={cn("p-1 md:p-2 lg:p-3 2xl:p-4 rounded-full",
                        selectedFilter === filter.id
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