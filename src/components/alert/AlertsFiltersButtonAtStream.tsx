import { cn } from '@/lib/utils';
import { IconBounceRight, IconFriends, IconLayoutDashboard, IconLicense, IconTreadmill, IconUserScan } from '@tabler/icons-react';
import React from 'react'
export const tabFilters = [
    { id: 0, label: "All", value: 'all', icon: <IconLayoutDashboard stroke={2} /> },
    { id: 1, label: "Intrusion", value:'INTRUSION_DETECTION', icon: <IconTreadmill stroke={2} /> },
    { id: 2, label: "Motion", value:'MOTION_DETECTION', icon: <IconBounceRight stroke={2} /> },
    { id: 3, label: "People", value:'PEOPLE_COUNT', icon: <IconFriends stroke={2} /> },
    { id: 4, label: "Face", value: 'FACE_DETECTION', icon: <IconUserScan stroke={2} /> },
    {id: 5, label: "Licence Plate", value: 'LICENSE_PLATE_DETECTION', icon: <IconLicense stroke={2} /> },

];
function AlertsFiltersButtonAtStream({selectedTab, setSelectedTab}: {selectedTab:string, setSelectedTab:(val:string) =>  void}) {
   
    return (
        <div className="flex gap-2 md:gap-4 min-h-min overflow-x-auto scrollbar-hide  p-2 pb-4 justify-center md:justify-normal">
            {tabFilters.map((tf, index) => (
                <button key={index}
                    onClick={() => setSelectedTab(tf.value)}
                    className={cn('flex flex-col items-center justify-center',
                        " w-10 h-10 md:w-17 md:h-17 px-3 rounded-lg md:rounded-xl hover:bg-white hover:text-black",
                        selectedTab === tf.value
                            ? "bg-[#2B4C88] text-white "
                            : "bg-[var(--surface-350)] text-[#888888]")}>
                    <div className='flex items-center justify-center ' > {React.cloneElement(tf.icon, { size: 16 })}</div>
                    <span className='text-xs mt-1'>{tf.label}</span>
                </button>
            ))}
        </div>
    )
}

export default AlertsFiltersButtonAtStream
