'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconDeviceSpeaker, IconVideo, IconTreadmill, IconBounceRight, IconFriends, IconHeadphones } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/CustomeSwitch';

export function StreamSettingsDialogue({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {

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
                <div className="bg-[var(--surface-200)] rounded-[69px] w-[90%] md:w-full max-w-3xl h-auto min-h-[600px] py-4 md:py-8 px-6 md:px-12 shadow-xl flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl font-extralight">Settings</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <IconX size={24} color='#FF2424' />
                        </button>
                    </div>

                    {/* Settings List */}
                    <div className="space-y-3 mb-6">
                        {/* Record All Videos */}
                        <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
                            <div className='flex gap-4 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-xl'>
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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
                            <div className='flex gap-4 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-xl'>
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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
                            <div className='flex gap-4 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-xl'>
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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
                            <div className='flex gap-4 items-center'>
                                <div className='p-2 bg-[#2B4C88] rounded-xl'>
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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] py-3 px-6 rounded-3xl">
                            <div className="flex items-center gap-2">
                                <div className='flex gap-4 items-center'>
                                    <div className='p-2 bg-[#2B4C88] rounded-xl'>
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

                    {/* Footer Buttons - Fixed to Bottom */}
                    <div className="flex justify-end gap-3 mt-4 pt-4">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 rounded-4xl border bg-[var(--surface-850)] text-[#888888]"
                        >
                            <IconX size={20} /><span>Close</span>
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-[#2B4C88] text-white hover:bg-blue-700"
                        >
                            <IconCheck size={20} /><span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
