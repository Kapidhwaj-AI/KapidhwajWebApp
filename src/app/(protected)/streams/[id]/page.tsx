"use client";
import CameraStreamCardMedium from '@/components/camera/CameraStreamCardMedium';
import { IconFilter, IconHeart, IconPencil, IconSettings, IconVideo } from '@tabler/icons-react'
import Link from 'next/link'
import React, { use, useState } from 'react'
import { AlertCard } from '@/components/alert/AlertCard';
import AlertsFiltersButtonAtStream from '@/components/alert/AlertsFiltersButtonAtStream';
import CameraStreamRecordingCard from '@/components/camera/CameraStreamRecordingCard';
import { AlertFiltersDialogue } from '@/components/dialogue/AlertsFiltersDialogue';
import { StreamSettingsDialogue } from '@/components/dialogue/StreamSettingsDialogue';
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/common/BackButton';
import { filterButtonClassname } from '@/styles/tailwind-class';

function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [filterDial, setFilterDial] = useState(false);
    const [settingDial, setSettingDial] = useState(false);
    const [makeFav, setMakeFav] = useState(false);
    const router = useRouter();
    const toggleStreamFav = () => {
        setMakeFav(!makeFav)
    };
    return (
        <div className="h-full flex flex-col gap-3 md:gap-5 min-h-0 px-2 md:px-4 pt-2 md:pt-3">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex items-center flex-wrap gap-2">
                    <BackButton />
                    <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-light ml-2 md:ml-5 whitespace-nowrap">
                        <span className="">HQ</span>
                        <span className="ml-2 md:ml-3">&gt;</span>
                        <span className="ml-2 md:ml-3">{id}</span>
                        <span className="ml-2 md:ml-3">&gt;</span>
                        <span className="ml-2 md:ml-3">Front Side</span>
                    </h1>
                </div>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button className={filterButtonClassname}
                        onClick={toggleStreamFav}>
                        <IconHeart stroke={makeFav ? 0 : 1} size={24} fill={makeFav ? 'red' : 'white'} />
                        <span className="hidden sm:inline">Favourite</span>
                    </button>
                    <button className={filterButtonClassname}>
                        <IconPencil stroke={1} size={24} />
                        <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button className={filterButtonClassname}
                        onClick={() => setSettingDial(true)} >
                        <IconSettings stroke={1} size={24} />
                        <span className="hidden sm:inline">Settings</span>
                    </button>
                    <button className={filterButtonClassname}
                        onClick={() => setFilterDial(true)}>
                        <IconFilter stroke={1} size={24} />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row flex-1 gap-3 md:gap-4 min-h-0">
                {/* Left Column */}
                <div className="flex-[5] flex flex-col gap-3 md:gap-5 h-full">
                    <div className="flex flex-col gap-3 md:gap-5 h-full overflow-y-auto scrollbar-hide">
                        <CameraStreamCardMedium />

                        <div className="flex flex-1 flex-col p-3 md:p-6 rounded-2xl md:rounded-4xl bg-[var(--surface-100)]">
                            <h3 className='text-sm md:text-md flex items-center gap-2 md:gap-3 mb-3 md:mb-4'>
                                <IconVideo stroke={2} size={18} />
                                <span>Recording</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                                {[0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, index) => (
                                    <CameraStreamRecordingCard key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex-[2] flex flex-col md:p-5 rounded-2xl md:rounded-4xl bg-[var(--surface-100)]">
                    <AlertsFiltersButtonAtStream />
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="grid grid-cols-1 gap-3 md:gap-6 min-h-min">
                            {[0, 1, 2, 3, 4, 5].map((_, index) => (
                                <AlertCard alert={""} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div >
            <AlertFiltersDialogue isOpen={filterDial} onClose={() => setFilterDial(false)} />
            <StreamSettingsDialogue isOpen={settingDial} onClose={() => setSettingDial(false)} />
        </div >
    )
}

export default page
