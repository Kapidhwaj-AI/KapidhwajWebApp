'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconDeviceSpeaker, IconVideo, IconTreadmill, IconBounceRight, IconFriends, IconHeadphones } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export function MainSettingsDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [settings, setSettings] = useState({
        recordings: false,
        allMotions: false,
        humanIntrusion: false,
        faceRecognition: false,
        audio: false
    });

    const handleSave = async () => {
        try {
            const response = await fetch('/api/camera-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings)
            });

            if (!response.ok) throw new Error('Failed to save settings');
            onClose();
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
                <div className="bg-[var(--surface-200)] rounded-2xl w-full max-w-2xl p-6 shadow-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Settings</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <IconX size={24} />
                        </button>
                    </div>

                    {/* Settings List */}
                    <div className="space-y-4 mb-6">
                        {/* Record All Videos */}
                        <div className="flex justify-between items-center bg-[var(--surface-300)] p-3 rounded-2xl">
                            <div className='flex gap-2 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-2xl'>
                                    <IconVideo stroke={2} color='white' />
                                </div>
                                <span> Record All Videos</span>
                            </div>
                            <Switch
                                enabled={settings.recordings}
                                onChange={() => toggleSetting('recordings')}
                            />
                        </div>

                        {/* Intrusion Detection */}
                        <div className="flex justify-between items-center bg-[var(--surface-300)] p-3 rounded-2xl">

                            <div className='flex gap-2 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-2xl'>
                                    <IconTreadmill stroke={2} color='white' />
                                </div>
                                <span>Intrusion Detection</span>
                            </div>
                            <Switch
                                enabled={settings.humanIntrusion}
                                onChange={() => toggleSetting('humanIntrusion')}
                            />
                        </div>

                        {/* Motion Detection */}
                        <div className="flex justify-between items-center bg-[var(--surface-300)] p-3 rounded-2xl">

                            <div className='flex gap-2 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-2xl'>
                                    <IconBounceRight stroke={2} color='white' />
                                </div>
                                <span>Motion Detection</span>
                            </div>
                            <Switch
                                enabled={settings.allMotions}
                                onChange={() => toggleSetting('allMotions')}
                            />
                        </div>

                        {/* People Detection */}
                        <div className="flex justify-between items-center bg-[var(--surface-300)] p-3 rounded-2xl">
                            <div className='flex gap-2 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-2xl'>
                                    <IconFriends stroke={2} color='white' />
                                </div>
                                <span>People Detection</span>
                            </div>
                            <Switch
                                enabled={settings.faceRecognition}
                                onChange={() => toggleSetting('faceRecognition')}
                            />
                        </div>

                        {/* Audio */}
                        <div className="flex justify-between items-center bg-[var(--surface-300)] p-3 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <div className='flex gap-2 items-center'>
                                    <div className='p-2 bg-[#2B4C88] rounded-2xl'>
                                        <IconHeadphones stroke={2} color='white' />
                                    </div>
                                    <span>Audio</span>
                                </div>
                            </div>
                            <Switch
                                enabled={settings.audio}
                                onChange={() => toggleSetting('audio')}
                            />
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

// Switch Component
function Switch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-600'
                }`}
            onClick={onChange}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );
}