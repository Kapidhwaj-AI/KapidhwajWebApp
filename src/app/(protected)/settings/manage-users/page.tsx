'use client';

import { useState } from 'react';
import { IconUserPlus, IconLock, IconCategory, IconKey } from '@tabler/icons-react';
import { BackButton } from '@/components/common/BackButton';
import Image from 'next/image';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { AddNewUserDialogue } from '@/components/dialogue/AddNewUserDialogue';
import { AddNewAccessDialogue } from '@/components/dialogue/AddNewAccessDialogue';

interface User {
    id: string;
    name: string;
    accessLevel: string;
    userId: string;
    image: string;
}

export default function ManageUsersPage() {
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isAddAccessModalOpen, setAddAccessModalOpen] = useState(false);

    // Generate sample users
    const generateUsers = () => {
        const sampleUsers = [
            { name: 'Ram', accessLevel: 'Full Access', userId: 'ram_001' },
            { name: 'Dhruvi', accessLevel: 'Full Access', userId: 'dhruvi_002' },
            { name: 'Nia', accessLevel: 'Edit Access', userId: 'nia2789' },
            { name: 'Audie', accessLevel: 'Full Access', userId: 'audeep_12' },
            { name: 'Ola', accessLevel: 'Full Access', userId: 'browser_12' },
            { name: 'Cameron', accessLevel: 'Edit Access', userId: 'browser_13' },
            { name: 'Dakota', accessLevel: 'Full Access', userId: 'user_14' },
            { name: 'Emmanuel', accessLevel: 'Edit Access', userId: 'user_15' },
            { name: 'Emma', accessLevel: 'Edit Access', userId: 'user_16' },
        ];

        return sampleUsers.map((user, i) => ({
            id: (i + 1).toString(),
            name: user.name,
            accessLevel: user.accessLevel,
            userId: user.userId,
            image: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80`
        }));
    };

    const users: User[] = generateUsers();

    return (
        <div className="h-full flex flex-col min-h-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-6">
                <div className="flex items-center flex-wrap gap-2">
                    <BackButton />
                    <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium ml-2 md:ml-5 whitespace-nowrap">
                        <span>Settings</span>
                        <span className="px-5">&gt;</span>
                        <span>Manage Users</span>
                    </h1>
                </div>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button
                        onClick={() => setAddUserModalOpen(true)}
                        className={filterButtonClassname}
                    >
                        <IconUserPlus stroke={1.5} size={20} />
                        <span className="hidden sm:inline">Add New User</span>
                    </button>
                    <button
                        onClick={() => setAddAccessModalOpen(true)}
                        className={filterButtonClassname}
                    >
                        <IconKey stroke={1.5} size={20} />
                        <span className="hidden sm:inline">Manage Access</span>
                    </button>
                </div>
            </div>

            {/* Users Grid */}
            <div className="scrollbar-hide grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-2 md:px-4 overflow-y-auto">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-[var(--surface-200)] rounded-[24px] w-full max-w-[465px] h-[140px] 2xl:h-[160px] 4xl:h-[199px] relative group hover:bg-[var(--surface-300)] transition-colors border border-[var(--surface-300)]"
                    >
                        {/* Top-right action buttons */}
                        <div className="absolute top-4 2xl:top-5 4xl:top-6 right-4 2xl:right-5 4xl:right-6 flex gap-2 z-10">
                            <button className="p-1.5 2xl:p-2 hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                <IconPencil size={18} className="text-gray-600" />
                            </button>
                            <button className="p-1.5 2xl:p-2 hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                <IconTrash size={18} className="text-[#FF6868]" />
                            </button>
                        </div>

                        <div className="flex h-full items-center">
                            {/* Image Container */}
                            <div className="flex items-center justify-center w-[140px] 2xl:w-[160px] 4xl:w-[199px] h-full flex-shrink-0 px-4">
                                <div className="relative w-[80px] h-[80px] 2xl:w-[90px] 2xl:h-[90px] 4xl:w-[100px] 4xl:h-[100px]">
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="flex-1 px-4 2xl:px-5 4xl:px-6">
                                <div className="flex flex-col justify-center gap-1 2xl:gap-2">
                                    <h3 className="text-base 2xl:text-lg font-medium">{user.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <IconLock size={14} className="2xl:w-4 2xl:h-4 text-gray-500" />
                                        <span className="text-sm text-gray-500">{user.accessLevel}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {user.userId}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            {/* Add New User Dialog */}
            <AddNewUserDialogue
                isOpen={isAddUserModalOpen}
                onClose={() => setAddUserModalOpen(false)}
            />

            {/* Add New Access Dialog */}
            <AddNewAccessDialogue
                isOpen={isAddAccessModalOpen}
                onClose={() => setAddAccessModalOpen(false)}
            />

            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
}

const filterButtonClassname = "bg-[var(--surface-500)] text-xs md:text-sm hover:bg-gray-50 text-[#888888] font-medium py-1 md:py-2 px-2 md:px-4 rounded-full shadow-sm transition-all duration-200 flex items-center gap-1"; 