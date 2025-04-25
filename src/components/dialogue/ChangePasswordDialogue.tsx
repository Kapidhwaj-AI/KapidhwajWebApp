'use client';

import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

export function ChangePasswordDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (newPassword !== confirmPassword) {
            // Handle password mismatch
            return;
        }
        // Handle password change logic here
        console.log('Password changed');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-[69px] w-[90%] md:w-[848px] h-[478px] py-4 px-10 md:p-8 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-[20px] md:text-[24px] font-extralight">Change Password</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={24} color='red' />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {/* New Password Field */}
                    <div>
                        <label className="block text-md font-medium mb-2">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter New Password here..."
                            className="w-full h-[60px] px-6 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-md font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter Confirm Password here..."
                            className="w-full h-[60px] px-6 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Action Buttons - Fixed to Bottom */}
                <div className="flex justify-end gap-4 mt-4 pt-4">
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
    );
} 