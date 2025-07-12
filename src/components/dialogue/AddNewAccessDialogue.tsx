'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconPlus, IconPencil, IconTrash, IconCrown } from '@tabler/icons-react';
import Modal from '../ui/Modal';

interface AddNewAccessDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddNewAccessDialogue({ isOpen, onClose }: AddNewAccessDialogueProps) {
    const [name, setName] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const accessTypes = [
        { id: '1', name: 'Full Access', description: 'Full access to entire app' },
        { id: '2', name: 'Streams Only', description: 'Can view streams' },
        { id: '3', name: 'Limited Access', description: 'Basic viewing permissions' }
    ];

    const handleAddAccess = () => {
        if (!name || !selectedType) return;
        console.log({
            name,
            type: selectedType
        });
        setName('');
        setSelectedType('');
    };

    const handleEditAccess = (id: string) => {
        console.log('Edit access:', id);
    };

    const handleDeleteAccess = (id: string) => {
        console.log('Delete access:', id);
    };

    const handleSave = () => {
        console.log('Save all changes');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} title='Add New Access'>
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {/* Name Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <div className='flex items-center gap-2'>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Name here..."
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className={`px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base ${(!name || !selectedType) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleAddAccess}
                                disabled={!name || !selectedType}
                            >
                                <span className="flex items-center gap-2">
                                    <IconPlus size={16} /> Add
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Type Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Select Type</label>
                        <div className="relative">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Type</option>
                                {accessTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <IconX size={16} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* All Accesses */}
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
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-200">
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
       </Modal>
    );
} 