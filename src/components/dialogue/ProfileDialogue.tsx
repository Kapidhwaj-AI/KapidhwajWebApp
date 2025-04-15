'use client';

import { useState } from 'react';
import { IconX } from '@tabler/icons-react';

export function ProfileDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [name, setName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [companyName, setCompanyName] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        // Handle profile update logic here
        console.log('Profile updated', { name, customerId, companyName });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-[69px] w-[90%] md:w-[848px] h-[478px] py-4 px-10 md:p-8 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-[20px] md:text-[24px] font-extralight">Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={24} color='red' />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-md font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Shruti Unadkat"
                            className="w-full h-[60px] px-6 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Customer ID Field */}
                    <div>
                        <label className="block text-md font-medium mb-2">Customer ID</label>
                        <input
                            type="text"
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            placeholder="CUS07621"
                            className="w-full h-[60px] px-6 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Company Name Field */}
                    <div>
                        <label className="block text-md font-medium mb-2">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Kapidhwaj AI Pvt. Ltd."
                            className="w-full h-[60px] px-6 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Action Buttons - Fixed to Bottom */}
                {/* <div className="flex justify-end gap-4 mt-4 pt-4">
                    <button
                        className="px-6 py-3 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-6 py-3 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div> */}
            </div>
        </div>
    );
} 