'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconPlus, IconCamera, IconSearch } from '@tabler/icons-react';
import Image from 'next/image';

interface AddNewUserDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Stream {
    id: string;
    name: string;
    location: string;
    area: string;
    imageUrl?: string;
}

export function AddNewUserDialogue({ isOpen, onClose }: AddNewUserDialogueProps) {
    const [usernameOrMobile, setUsernameOrMobile] = useState('');
    const [selectedAccess, setSelectedAccess] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('All Streams');
    const [selectedStreams, setSelectedStreams] = useState<string[]>([]);

    // Sample data
    const accessTypes = [
        { id: '1', name: 'Full Access' },
        { id: '2', name: 'Streams Only' },
        { id: '3', name: 'Limited Access' }
    ];

    const streams: Stream[] = [
        { id: '1', name: 'Camera 1', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream1.jpg' },
        { id: '2', name: 'Camera 2', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream2.jpg' },
        { id: '3', name: 'Camera 3', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream3.jpg' },
        { id: '4', name: 'Camera 4', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream4.jpg' },
        { id: '5', name: 'Camera 5', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream5.jpg' },
        { id: '6', name: 'Camera 6', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream6.jpg' },
        { id: '7', name: 'Camera 7', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream7.jpg' },
        { id: '8', name: 'Camera 8', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream8.jpg' },
        { id: '9', name: 'Camera 9', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream9.jpg' },
        { id: '10', name: 'Camera 10', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream10.jpg' },
        { id: '11', name: 'Camera 11', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream11.jpg' },
        { id: '12', name: 'Camera 12', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream12.jpg' },
        { id: '13', name: 'Camera 13', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream13.jpg' },
        { id: '14', name: 'Camera 14', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream14.jpg' },
        { id: '15', name: 'Camera 15', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream15.jpg' },
        { id: '16', name: 'Camera 16', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream16.jpg' },
        { id: '17', name: 'Camera 17', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream17.jpg' },
        { id: '18', name: 'Camera 18', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream18.jpg' },
        { id: '19', name: 'Camera 19', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream19.jpg' },
        { id: '20', name: 'Camera 20', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream20.jpg' },
        { id: '21', name: 'Camera 21', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream21.jpg' },
        { id: '22', name: 'Camera 22', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream22.jpg' },
        { id: '23', name: 'Camera 23', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream23.jpg' },
        { id: '24', name: 'Camera 24', location: 'HQ', area: 'Reception Area', imageUrl: '/assets/images/streams/stream24.jpg' },
        { id: '25', name: 'Camera 25', location: 'HQ', area: 'Office Ground', imageUrl: '/assets/images/streams/stream25.jpg' }
    ];

    const areas = ['All Streams', 'Reception Area', 'Office Ground'];

    const toggleStreamSelection = (streamId: string) => {
        setSelectedStreams(prev =>
            prev.includes(streamId)
                ? prev.filter(id => id !== streamId)
                : [...prev, streamId]
        );
    };

    const handleSelectAll = () => {
        const filteredStreams = streams
            .filter(stream =>
                (selectedTab === 'All Streams' || stream.area === selectedTab) &&
                (searchQuery === '' || stream.name.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map(stream => stream.id);

        if (selectedStreams.length === filteredStreams.length) {
            setSelectedStreams([]);
        } else {
            setSelectedStreams(filteredStreams);
        }
    };

    const filteredStreams = streams.filter(stream =>
        (selectedTab === 'All Streams' || stream.area === selectedTab) &&
        (searchQuery === '' || stream.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50 p-3">
            <div className="bg-white dark:bg-gray-800 rounded-[32px] w-[98%] h-[90vh] shadow-xl flex flex-col">
                <div className="flex flex-col lg:flex-row h-full">
                    {/* Left Section - Form */}
                    <div className="w-full lg:w-[30%] p-6 lg:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-medium dark:text-white">Add New User</h2>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1">
                            {/* Username/Mobile Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Username / Mobile Phone</label>
                                <input
                                    type="text"
                                    value={usernameOrMobile}
                                    onChange={(e) => setUsernameOrMobile(e.target.value)}
                                    placeholder="Search User"
                                    className="w-full h-[45px] px-4 text-base bg-[#F6F6F6] dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                />
                            </div>

                            {/* Access Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Access</label>
                                <select
                                    value={selectedAccess}
                                    onChange={(e) => setSelectedAccess(e.target.value)}
                                    className="w-full h-[45px] px-4 text-base bg-[#F6F6F6] dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer dark:text-white"
                                >
                                    <option value="" disabled>Select Access</option>
                                    {accessTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                className="w-full h-[45px] bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base transition-colors"
                                onClick={() => {
                                    console.log({
                                        usernameOrMobile,
                                        selectedAccess,
                                        selectedStreams
                                    });
                                    onClose();
                                }}
                            >
                                <span className='flex items-center justify-center gap-2'><IconCheck size={16} />Save</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Section - Streams */}
                    <div className="w-full lg:w-[70%] lg:rounded-r-[32px] px-6 lg:px-8 py-3 lg:py-6 overflow-hidden flex flex-col">
                        {/* Tabs */}
                        <div className='flex items-center  mb-5 justify-between'>
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                {areas.map((area) => (
                                    <button
                                        key={area}
                                        onClick={() => setSelectedTab(area)}
                                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedTab === area
                                            ? 'bg-[#2B4C88] text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <IconX size={20} className="text-red-500" />
                            </button>
                        </div>

                        {/* Search and Select All */}
                        <div className='p-5 flex-1 overflow-y-auto scrollbar-hide bg-[#F6F6F6] dark:bg-gray-900 rounded-4xl'>

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedStreams.length === filteredStreams.length && filteredStreams.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                                    />
                                    <span className="text-sm dark:text-gray-300">Select all</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search Stream..."
                                        className="h-[35px] w-[200px] pl-9 pr-4 text-sm bg-white dark:bg-gray-800 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                    />
                                    <IconSearch size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                                </div>
                            </div>

                            {/* Streams Grid */}
                            <div className="flex-1 overflow-y-auto scrollbar-hide">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredStreams.map((stream) => (
                                        <div
                                            key={stream.id}
                                            className="group relative bg-white p-5 dark:bg-gray-800 rounded-xl overflow-hidden"
                                        >
                                            <div className="aspect-video relative">
                                                <Image
                                                    src={'/assets/images/camera-default.png'}
                                                    alt={stream.name}
                                                    fill
                                                    className="object-cover rounded-xl"
                                                />
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className="px-3 pt-3 to-transparent">
                                                    <h3 className="text-sm font-black">{stream.name}</h3>
                                                    <p className="text-xs text-[#888888]">{stream.location} {' > '} {stream.area}</p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStreams.includes(stream.id)}
                                                    onChange={() => toggleStreamSelection(stream.id)}
                                                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
} 