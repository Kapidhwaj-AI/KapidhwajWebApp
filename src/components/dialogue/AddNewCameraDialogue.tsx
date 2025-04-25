'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconRefresh, IconCopy, IconRouter, IconCopyPlus } from '@tabler/icons-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cameras } from '../device/SavedCameras';

interface AddNewCameraDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddNewCameraDialogue({ isOpen, onClose }: AddNewCameraDialogueProps) {
    const [ipAddress, setIpAddress] = useState('');
    const [name, setName] = useState('');
    const [siteName, setSiteName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log('Refreshed nearby hubs');
        } catch (error) {
            console.error('Error refreshing hubs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        console.log({
            ipAddress,
            name,
            siteName,
            roomName
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-[50px] w-[95%] lg:w-2xl max-w-[800px] max-h-[97vh] px-10 pt-5 pb-4 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Add New Camera</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={20} color='red' />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* IP Address Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">IP Address</label>
                            <input
                                type="text"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                placeholder="Enter IP Address here..."
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Name here..."
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                placeholder="Enter username"
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                placeholder="Enter password"
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Site Name Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Site Name</label>
                            <input
                                type="text"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                placeholder="Enter site name"
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Folder Name Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Folder Name</label>
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Enter folder name"
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200 mb-4"></div>

                    {/* Nearby Cameras Section */}
                    <div>
                        <div className="flex gap-2 items-center mb-2">
                            <h2 className="text-sm font-bold">Nearby Cameras</h2>
                            <button
                                onClick={handleRefresh}
                                disabled={isLoading}
                                className="p-1.5 hover:bg-[var(--surface-200)] rounded-full transition-colors disabled:opacity-50"
                            >
                                <IconRefresh
                                    size={16}
                                    className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`}
                                />
                            </button>
                        </div>

                        <div className="w-full h-[140px] md:h-[160px] xl:h-[240px] bg-[var(--surface-100)] p-3 rounded-[24px]">
                            <div className="space-y-2 h-full overflow-y-auto pr-2 scrollbar-hide">
                                {cameras.map((hub) => (
                                    <div key={hub.ip} className="flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-[12px] transition-colors min-h-[60px]">
                                        <div className="w-[44px] h-[44px] bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                            <IconRouter size={18} className="text-gray-600" />
                                        </div>
                                        <div className="ml-2.5 flex-1 min-w-0">
                                            <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                            <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                                        </div>
                                        <button
                                            onClick={() => { }}
                                            className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconCopyPlus size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-10">
                        <button
                            className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                            onClick={onClose}
                        >
                            <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />Close</span>
                        </button>
                        <button
                            className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                            onClick={handleSave}
                        >
                            <span className='flex items-center gap-2'><IconCheck size={16} />Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 