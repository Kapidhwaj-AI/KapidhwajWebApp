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
                <div className="bg-[var(--surface-200)] rounded-[60px] w-full max-w-2xl py-8 px-10 shadow-xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-7">
                        <h2 className="text-2xl font-light">Settings</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <IconX size={24} />
                        </button>
                    </div>
                    {/* Settings List */}
                    <div className="space-y-4 mb-10">
                        {/* Record All Videos */}
                        <div className="flex justify-between items-center bg-[var(--surface-800)] p-4 rounded-4xl">
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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] p-4 rounded-4xl">

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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] p-4 rounded-4xl">

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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] p-4 rounded-4xl">
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
                        <div className="flex justify-between items-center bg-[var(--surface-800)] p-4 rounded-4xl">
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
                            className="flex items-center gap-2 px-4 py-2 rounded-4xl border bg-[var(--surface-850)] text-gray-700 dark:text-gray-300"
                        >
                            <IconX size={24} /><span>Cancel</span>
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 rounded-4xl bg-[#2B4C88] text-white hover:bg-blue-700"
                        >
                            <IconCheck size={24} /><span>Save</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
