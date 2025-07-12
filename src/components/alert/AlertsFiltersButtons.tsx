import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { tabFilters } from "./AlertsFiltersButtonAtStream";

const AlertsFiltersButtons = ({selectedTab, setSelectedTab}:{selectedTab:string, setSelectedTab:(value:string) => void}) => {
    return (
        <div className="flex space-x-4 w-10/12">
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