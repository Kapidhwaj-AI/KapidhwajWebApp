import CameraStreamCard from '@/components/camera/CameraStreamRecordingCard';
import CameraStreamCardMedium from '@/components/camera/CameraStreamCardMedium';
import { IconBounceRight, IconFilter, IconFriends, IconHeart, IconPencil, IconSettings, IconTreadmill, IconVideo } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import { AlertCard } from '@/components/alert/AlertCard';

export const tabFilters = [
    { id: 0, label: "Intrusion", icon: <IconTreadmill stroke={2} /> },
    { id: 1, label: "Motion", icon: <IconBounceRight stroke={2} /> },
    { id: 2, label: "People", icon: <IconFriends stroke={2} /> },
];
function page({ params }) {
    const { id } = params;
    return (
        <div className="h-full flex flex-col gap-3 md:gap-5 min-h-0 px-2 md:px-4 pt-2 md:pt-3">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex items-center flex-wrap gap-2">
                    <Link href={"/streams"} className="bg-[var(--surface-500)] text-sm md:text-md hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-3 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <span className="text-md leading-none">&lt;</span>
                        <span className="hidden sm:inline">Back</span>
                    </Link>
                    <h1 className="text-xl md:text-3xl font-light ml-2 md:ml-5 whitespace-nowrap">
                        <span className="">HQ</span>
                        <span className="ml-2 md:ml-5">&gt;</span>
                        <span className="ml-2 md:ml-5">{id}</span>
                        <span className="ml-2 md:ml-5">&gt;</span>
                        <span className="ml-2 md:ml-5">Front Side</span>
                    </h1>
                </div>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <div className="bg-[var(--surface-5000)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <IconHeart stroke={2} size={16} />
                        <span className="hidden sm:inline">Favourite</span>
                    </div>
                    <div className="bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <IconPencil stroke={2} size={16} />
                        <span className="hidden sm:inline">Edit</span>
                    </div>
                    <div className="bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <IconSettings stroke={2} size={16} />
                        <span className="hidden sm:inline">Settings</span>
                    </div>
                    <div className="bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1">
                        <IconFilter stroke={2} size={16} />
                        <span className="hidden sm:inline">Filters</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row flex-1 gap-3 md:gap-4 min-h-0">
                {/* Left Column */}
                <div className="flex-[4.5] flex flex-col gap-3 md:gap-5 h-full">
                    <div className="flex flex-col gap-3 md:gap-5 h-full overflow-hidden">
                        <CameraStreamCardMedium />

                        <div className="flex flex-1 flex-col p-3 md:p-6 rounded-2xl md:rounded-4xl bg-[var(--surface-100)] overflow-y-auto scrollbar-hide">
                            <h3 className='text-sm md:text-md flex items-center gap-2 md:gap-3 mb-3 md:mb-4'>
                                <IconVideo stroke={2} size={18} />
                                <span>Recording</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                                    <CameraStreamCard key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex-[2.5] flex flex-col p-2 md:p-5 rounded-2xl md:rounded-4xl bg-[var(--surface-100)]">
                    <div className="flex gap-2 md:gap-6 min-h-min py-3 md:py-5 justify-center md:justify-normal">
                        {tabFilters.map((tf, index) => (
                            <button key={index} className='flex flex-col items-center justify-center bg-[#2B4C88] text-white w-12 h-12 md:w-20 md:h-20 rounded-lg md:rounded-xl hover:bg-white'>
                                <div className='flex items-center justify-center '>{React.cloneElement(tf.icon, { size: 16 })}</div>
                                <span className='text-xs mt-1'>{tf.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-1 gap-3 md:gap-6 min-h-min">
                            {[0, 1, 2, 3, 4, 5].map((_, index) => (
                                <AlertCard alert={""} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page