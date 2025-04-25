'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';

interface AddNewCategoryDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddNewCategoryDialogue({ isOpen, onClose }: AddNewCategoryDialogueProps) {
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const colors = [
        '#FF8A8A', // Coral Pink
        '#FFB572', // Light Orange
        '#7BD959', // Light Green
        '#50D7E7', // Light Blue
        '#5B8FF9', // Blue
        '#B37FEB', // Purple
        '#FF85C0'  // Pink
    ];

    const categories = [
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '1', name: 'Employees', count: '10 people assigned' },
        { id: '2', name: 'Outsiders', count: '20 people assigned' }
    ];

    const handleAddCategory = () => {
        if (!name || !selectedColor) return;
        console.log({
            name,
            color: selectedColor
        });
        setName('');
    };

    const handleEditCategory = (id: string) => {
        console.log('Edit category:', id);
    };

    const handleDeleteCategory = (id: string) => {
        console.log('Delete category:', id);
    };

    const handleSave = () => {
        console.log('Save all changes');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-[50px] w-[95%] lg:w-2xl max-w-[600px] max-h-[97vh] px-10 pt-5 pb-4 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Add New Category</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={20} color='red' />
                    </button>
                </div>

                {/* Content Area */}
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
                                className={`px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base ${(!name || !selectedColor) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleAddCategory}
                                disabled={!name || !selectedColor}
                            >
                                <span className="flex items-center gap-2">
                                    <IconPlus size={16} /> Add
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Select Color</label>
                        <div className="flex gap-3 flex-wrap">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full transition-transform ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* All Categories */}
                    <div>
                        <h2 className="text-sm mb-2">All Categories</h2>
                        <div className="w-full h-[300px] lg:h-[350px] bg-[#F6F6F6] dark:bg-[var(--surface-100)] p-5 rounded-[24px]">
                            <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-hide">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center p-3 bg-white dark:bg-[var(--surface-200)] hover:bg-gray-50 dark:hover:bg-[var(--surface-300)] rounded-[12px] transition-colors">
                                        <div className="w-[44px] h-[44px] bg-[#7BD959] rounded-lg flex items-center justify-center">
                                            <span className="text-lg font-medium text-white">
                                                {category.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-2.5 flex-1">
                                            <h3 className="text-sm font-medium">{category.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{category.count}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditCategory(category.id)}
                                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                            >
                                                <IconPencil size={24} className="text-gray-600 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
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
            </div>
        </div>
    );
} 