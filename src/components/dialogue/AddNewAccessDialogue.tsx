'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconPlus } from '@tabler/icons-react';
import Modal from '../ui/Modal';
import { useTranslations } from 'next-intl';
import { InputField } from '../ui/Input.field';
import SelectField from '../ui/Select.field';

interface AddNewAccessDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddNewAccessDialogue({ isOpen, onClose }: AddNewAccessDialogueProps) {
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const t = useTranslations()

    const accessTypes = [
        { id: '1', name: 'OWNER', description: 'Full access to entire app' },
        { id: '2', name: 'Streams Only', description: 'Can view streams' },
        { id: '3', name: 'Limited Access', description: 'Basic viewing permissions' }
    ];

    const handleAddAccess = () => {
        if (!name || !selectedType) return;
        setName('');
        setSelectedType('');
    };

  

    const handleSave = () => {
        onClose();
    };

    if (!isOpen) return null;
    return (
        <Modal onClose={onClose} title={t('settings.add_new_access')}>
            <form className="w-full h-full overflow-y-auto scrollbar-hide">
                {/* Name Field */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">{t('settings.name')}</label>
                    <div className='flex items-center gap-2'>
                        <InputField
                            value={name}
                            setValue={setName}
                            placeholder={t("settings.enter_name_here")}
                        />
                        <button
                            className={`px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base ${(!name || !selectedType) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleAddAccess}
                            disabled={!name || !selectedType}
                        >
                            <span className="flex items-center gap-2">
                                <IconPlus size={16} /> {t('settings.add')}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <SelectField value={selectedType} setValue={setSelectedType} data={accessTypes} label={t('settings.select_type')} placeholder={t('settings.select_type')} />
                </div>
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
                    <button
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />{t('cancel')}</span>
                    </button>
                    <button type='submit'
                        className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base"
                        onClick={handleSave}
                    >
                        <span className='flex items-center gap-2'><IconCheck size={16} />{t('save')}</span>
                    </button>
                </div>
                {/* All Accesses
                    <div>
                        <h2 className="text-sm mb-2">All Accesses</h2>
                        <div className="w-full h-[300px] lg:h-[350px] bg-[#F6F6F6] dark:bg-[var(--surface-100)] p-5 rounded-[24px]">
                            <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-hide">
                                {accessTypes.map((access) => (
                                    <div key={access.id} className="flex items-center p-3 bg-white dark:bg-[var(--surface-200)] hover:bg-gray-50 dark:hover:bg-[var(--surface-300)] rounded-[12px] transition-colors">
                                        <div className="w-[44px] h-[44px] bg-[#5B8FF9] rounded-lg flex items-center justify-center">
                                            <IconCrown size={24} className="text-white" />
                                        </div>
                                        <div className="ml-2.5 flex-1">
                                            <h3 className="text-sm font-medium">{access.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{access.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditAccess(access.id)}
                                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                            >
                                                <IconPencil size={24} className="text-gray-600 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAccess(access.id)}
                                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                            >
                                                <IconTrash size={24} className="text-[#FF6868]" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

            </form>

        </Modal>
    );
} 