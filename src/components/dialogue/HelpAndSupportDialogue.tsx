'use client';

import { IconMail, IconPhone, IconX } from '@tabler/icons-react';

export function HelpAndSupportDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
                <div className="bg-[var(--surface-200)] rounded-[69px] w-full max-w-3xl p-10 shadow-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-7">
                        <h2 className="text-xl font-bold">Support</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <IconX size={24} color='red' />
                        </button>
                    </div>

                    {/* Support Content */}
                    <div className="space-y-7 mb-5">
                        <p className="text-md text-gray-700 dark:text-gray-300">
                            For any questions or issues, please reach out to the contact number provided below.
                        </p>

                        <div className="flex flex-col space-y-5">
                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-[#56CE40] rounded-xl'>
                                    <IconPhone size={40} stroke={2} color='white' />
                                </div>
                                <a
                                    href="tel:+919876543210"
                                    className="text-4xl hover:underline"
                                >
                                    +91 9876543210
                                </a>
                            </div>

                            <div className='flex items-center gap-4'>
                                <div className='p-3 bg-[#FF6868] rounded-xl'>
                                    <IconMail size={40} stroke={2} color='white' />
                                </div>
                                <a
                                    href="mailto:mail@kapidhwaj.ai"
                                    className="text-4xl hover:underline"
                                >
                                    mail@kapidhwaj.ai
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}