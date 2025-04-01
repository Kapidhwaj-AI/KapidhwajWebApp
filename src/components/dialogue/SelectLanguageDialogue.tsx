'use client';

import { IconX, IconCheck, IconDeviceSpeaker, IconVideo, IconLanguage } from '@tabler/icons-react';
import { useState } from 'react';

export function SelectLanguageDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const handleSave = () => {
        // Save the selected language to your backend or state management
        console.log('Selected language:', selectedLanguage);
        onClose();
    }

    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
                <div className="bg-[var(--surface-200)] rounded-2xl w-full max-w-xl p-6 shadow-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Language Settings</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <IconX size={24} />
                        </button>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <IconLanguage size={24} />
                            <h3 className="font-medium">Select Language</h3>
                        </div>

                        <div className="space-y-3 pl-9">
                            {/* English */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="language"
                                    value="english"
                                    checked={selectedLanguage === 'english'}
                                    onChange={() => setSelectedLanguage('english')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span>English</span>
                            </label>

                            {/* Hindi */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="language"
                                    value="hindi"
                                    checked={selectedLanguage === 'hindi'}
                                    onChange={() => setSelectedLanguage('hindi')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span>हिंदी</span>
                            </label>

                            {/* Gujarati */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="language"
                                    value="gujarati"
                                    checked={selectedLanguage === 'gujarati'}
                                    onChange={() => setSelectedLanguage('gujarati')}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span>ગુજરાતી</span>
                            </label>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border bg-[var(--surface-300)] text-gray-700 dark:text-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}