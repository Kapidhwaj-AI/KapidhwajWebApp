'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconPlus, IconFolder, IconTrash, IconPencil } from '@tabler/icons-react';
import Modal from '../ui/Modal';
import { InputField } from '../ui/Input.field';
import { useTranslations } from 'next-intl';

interface AddNewFolderDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddNewFolderDialogue({ isOpen, onClose }: AddNewFolderDialogueProps) {
    const [name, setName] = useState('');
    const handleAddFolder = () => {

        onClose();
    };
    const t = useTranslations()

    if (!isOpen) return null;
    return (
        <Modal onClose={onClose} title='Add New Room'>
            <div className="flex-1">
                {/* Name Field */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <div className='flex items-center gap-2'>
                        <InputField value={name} setValue={setName} label={t('settings.name')} placeholder={t('settings.enter_name_here')} />

                        <button
                            className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                            onClick={handleAddFolder}
                        >
                            <span className="flex items-center gap-2">
                                <IconPlus size={16} /> Add
                            </span>
                        </button>
                    </div>
                </div>
                <div className="h-px bg-gray-200 mb-4"></div>
                <div>
                    <h2 className="text-sm mb-2">All Room</h2>
                    <div className="w-full lg:h-[300px] xl:h-[400px] bg-[var(--surface-100)] p-5 rounded-[24px]">
                        <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-hide">
                            {/* Example Room Items */}
                            {[
                                { id: '1', name: 'Lobby', count: '27 cameras inside' },
                                { id: '2', name: 'Reception Area', count: '27 cameras inside' },
                                { id: '3', name: '2nd floor office', count: '27 cameras inside' }
                            ].map((folder) => (
                                <div key={folder.id} className="flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-[12px] transition-colors">
                                    <div className="w-[44px] h-[44px] bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                        <IconFolder size={18} className="text-gray-600" />
                                    </div>
                                    <div className="ml-2.5 flex-1">
                                        <h3 className="text-sm font-medium">{folder.name}</h3>
                                        <p className="text-xs text-gray-500">{folder.count}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button

                                            className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconPencil size={24} className="text-gray-600" />
                                        </button>
                                        <button

                                            className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                        >
                                            <IconTrash size={24} className="text-[#FF6868]" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />Close</span>
                    </button>
                    <button
                        className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"

                    >
                        <span className='flex items-center gap-2'><IconCheck size={16} />Save</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
} 