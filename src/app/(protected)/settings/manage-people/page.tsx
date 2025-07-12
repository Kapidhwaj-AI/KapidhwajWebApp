'use client';

import { useState } from 'react';
import { IconUserPlus, IconCategory } from '@tabler/icons-react';
import { BackButton } from '@/components/common/BackButton';
import Image from 'next/image';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { AddNewPersonDialogue } from '@/components/dialogue/AddNewPersonDialogue';
import { AddNewCategoryDialogue } from '@/components/dialogue/AddNewCategoryDialogue';

interface Person {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    type: 'Employees' | 'Outsiders';
    image: string;
    status: 'active' | 'inactive';
}

export default function ManagePeoplePage() {
    const [isAddPersonModalOpen, setAddPersonModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);

    // Generate 40 sample people
    const generatePeople = () => {
        const sampleNames = [
            'Neha Shah', 'Lyle Kutch', 'Warren Cummerata', 'Yolanda Cummings',
            'Jared Bernier', 'Cassandra Considine', 'Alex Morgan', 'Sarah Chen',
            'Marcus Rodriguez', 'Emma Thompson', 'David Kim', 'Rachel Foster'
        ];
        const types = ['Employees', 'Outsiders'] as const;
        const genders = ['Male', 'Female'] as const;

        return Array.from({ length: 40 }, (_, i) => ({
            id: (i + 1).toString(),
            name: sampleNames[i % sampleNames.length],
            age: 25 + Math.floor(Math.random() * 20),
            gender: genders[i % 2],
            type: types[Math.floor(i / 20)],
            image: `https://images.unsplash.com/photo-1438761681033-6461ffad8d80`,
            status: i < 20 ? 'active' as const : 'inactive' as const
        }));
    };

    const people: Person[] = generatePeople();

    return (
        <div className="h-full flex flex-col min-h-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-6">
                <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold ml-2 md:ml-5 whitespace-nowrap">
                    Manage People
                </h1>
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button
                        onClick={() => setAddPersonModalOpen(true)}
                        className={filterButtonClassname}
                    >
                        <IconUserPlus stroke={1.5} size={20} />
                        <span className="hidden sm:inline">Add New Person</span>
                    </button>
                    <button
                        onClick={() => setAddCategoryModalOpen(true)}
                        className={filterButtonClassname}
                    >
                        <IconCategory stroke={1.5} size={20} />
                        <span className="hidden sm:inline">Categories</span>
                    </button>
                </div>
            </div>

            {/* People Grid */}
            <div className="scrollbar-hide grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-2 md:px-4 overflow-y-auto">
                {people.map((person) => (
                    <div
                        key={person.id}
                        className="bg-[var(--surface-200)] rounded-[24px] w-full max-w-[465px] h-[140px] 2xl:h-[160px] 4xl:h-[199px] relative group hover:bg-[var(--surface-300)] transition-colors border border-[var(--surface-300)]"
                    >
                        <div className="flex h-full">
                            {/* Image Container */}
                            <div className="w-[106px] 2xl:w-[120px] 4xl:w-[151px] h-full flex-shrink-0">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    width={151}
                                    height={199}
                                    className="rounded-l-[24px] object-cover h-full w-full"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="flex-1 p-4 2xl:p-5 4xl:p-6 relative">
                                {/* Action Buttons - Aligned with name */}
                                <div className="absolute right-4 2xl:right-5 4xl:right-6 top-4 2xl:top-5 4xl:top-6 flex gap-2">
                                    <button className="p-1.5 2xl:p-2 hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                        <IconPencil size={18} className="text-gray-600" />
                                    </button>
                                    <button className="p-1.5 2xl:p-2 hover:bg-[var(--surface-400)] rounded-lg transition-colors">
                                        <IconTrash size={18} className="text-[#FF6868]" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 mb-1 2xl:mb-2">
                                    <h3 className="text-base 2xl:text-lg font-medium">{person.name}</h3>
                                    {person.status === 'active' && (
                                        <div className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-red-500" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1 2xl:mb-2">
                                    <span className="flex items-center gap-1">
                                        <IconUserPlus size={14} className="2xl:w-4 2xl:h-4" />
                                        {person.age} y/o
                                    </span>
                                    <span>•</span>
                                    <span>{person.gender}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {person.type}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Person Dialog */}
            <AddNewPersonDialogue
                isOpen={isAddPersonModalOpen}
                onClose={() => setAddPersonModalOpen(false)}
            />

            {/* Add New Category Dialog */}
            <AddNewCategoryDialogue
                isOpen={isAddCategoryModalOpen}
                onClose={() => setAddCategoryModalOpen(false)}
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
