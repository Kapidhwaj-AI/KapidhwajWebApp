import { cn } from '@/lib/utils';
import { IconBounceRight, IconFriends, IconTreadmill } from '@tabler/icons-react';
import React, { useState } from 'react'
export const tabFilters = [
    { id: 0, label: "Intrusion", icon: <IconTreadmill stroke={2} /> },
    { id: 1, label: "Motion", icon: <IconBounceRight stroke={2} /> },
    { id: 2, label: "People", icon: <IconFriends stroke={2} /> },
];
function AlertsFiltersButtonAtStream() {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div className="flex gap-2 md:gap-4 min-h-min  pb-5 justify-center md:justify-normal">
            {tabFilters.map((tf, index) => (
                <button key={index}
                    onClick={() => setSelectedTab(tf.id)}
                    className={cn('flex flex-col items-center justify-center',
                        " w-10 h-10 md:w-17 md:h-17 rounded-lg md:rounded-xl hover:bg-white hover:text-black",
                        selectedTab === tf.id
                            ? "bg-[#2B4C88] text-white "
                            : "bg-[var(--surface-300)] text-[#888888]")}>
                    <div className='flex items-center justify-center ' > {React.cloneElement(tf.icon, { size: 16 })}</div>
                    <span className='text-xs mt-1'>{tf.label}</span>
                </button>
            ))}
        </div>
    )
}

export default AlertsFiltersButtonAtStream
