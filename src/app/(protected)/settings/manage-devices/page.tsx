"use client";

import { BackButton } from "@/components/common/BackButton";
import { IconDoor, IconMapPinFilled, IconDevices, IconFolderPlus } from "@tabler/icons-react";
import { NearbyHubs } from "@/components/device/NearbyHubs";
import { SavedCameras } from "@/components/device/SavedCameras";
import { SavedHubs } from "@/components/device/SavedHubs";
import { useState } from "react";
import { AddNewSiteDialogue } from "@/components/dialogue/AddNewSiteDialogue";
import { AddNewFolderDialogue } from '@/components/dialogue/AddNewFolderDialogue';

interface Hub {
    name: string;
    ip: string;
}

export default function ManageDevices() {
    const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
    const [siteModalOpen, setSiteModalOpen] = useState(false);
    const [isAddFolderModalOpen, setAddFolderModalOpen] = useState(false);

    const handleHubSelect = (hub: Hub) => {
        setSelectedHub(hub);
    };

    return (
        <div className="h-full flex flex-col min-h-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-7">
                <div className="flex items-center flex-wrap gap-2">
                    <BackButton />
                    <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium ml-2 md:ml-5 whitespace-nowrap">
                        <span>Setting</span>
                        <span className="px-5">&gt;</span>
                        <span>Manage Devices</span>
                    </h1>
                </div>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button onClick={() => setSiteModalOpen(true)} className={filterButtonClassname}>
                        <IconMapPinFilled stroke={1} size={24} className="dark:text-white" />
                        <span className="hidden sm:inline dark:text-white">Manage Sites</span>
                    </button>
                    <button
                        onClick={() => setAddFolderModalOpen(true)}
                        className={filterButtonClassname}
                    >
                        <IconFolderPlus stroke={1.5} size={20} />
                        <span className="hidden sm:inline">Manage Rooms</span>
                    </button>
                </div>
            </div>

            {/* Main Content - Fills Remaining Height */}
            <div className="flex-1 flex flex-col lg:flex-row gap-3 md:gap-7 min-h-0 px-2 md:px-4 pb-3">
                {/* Left Column */}
                <div className="flex-[3] flex flex-col gap-3 md:gap-5 min-h-0">
                    {/* Nearby Hubs Component - Exactly 50% height */}
                    <div className="flex-1 min-h-0">
                        <NearbyHubs className="h-full" />
                    </div>

                    {/* Saved Hubs Component - Exactly 50% height */}
                    <div className="flex-1 min-h-0">
                        <SavedHubs className="h-full" onHubSelect={handleHubSelect} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex-[4] flex flex-col min-h-0">
                    <div className="h-full bg-[var(--surface-100)] rounded-2xl md:rounded-4xl">
                        {selectedHub ? (
                            <SavedCameras hub={selectedHub} />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <p>Select a hub to view its cameras</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AddNewSiteDialogue
                isOpen={siteModalOpen}
                onClose={() => setSiteModalOpen(false)}
            />
            <AddNewFolderDialogue
                isOpen={isAddFolderModalOpen}
                onClose={() => setAddFolderModalOpen(false)}
            />
        </div>
    );
}

const filterButtonClassname = "bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1";
