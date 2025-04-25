'use client';

import { useState } from 'react';
import { IconX, IconCheck, IconCamera } from '@tabler/icons-react';
import Image from 'next/image';

interface AddNewPersonDialogueProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddNewPersonDialogue({ isOpen, onClose }: AddNewPersonDialogueProps) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        category: ''
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        console.log('Form Data:', formData);
        console.log('Selected Image:', selectedImage);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-[50px] w-[95%] lg:w-2xl max-w-[600px] max-h-[97vh] px-10 pt-5 pb-4 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Add New Person</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={20} color='red' />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter Name here..."
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Age and Gender Row */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Age Field */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Age</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    placeholder="Enter Age here..."
                                    className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Gender Field */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Category Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                <option value="Employees">Employees</option>
                                <option value="Outsiders">Outsiders</option>
                            </select>
                        </div>

                        {/* Photo Upload */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Photo</label>
                            <div className="relative w-[320px] h-[120px] bg-[var(--surface-150)] rounded-[24px] overflow-hidden cursor-pointer group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <label htmlFor="photo-upload" className="w-full h-full flex flex-col justify-center cursor-pointer">
                                    {selectedImage ? (
                                        <Image
                                            src={selectedImage}
                                            alt="Selected"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex gap-4 items-center justify-center">
                                            <div className="flex w-16 h-16 rounded-full bg-gray-200 items-center justify-center mb-1">
                                                <Image src={'/assets/images/person-logo.png'} width={100} height={100} alt='camera' className='object-cover' />
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <div className="text-xs">Photo</div>
                                                <div className="text-xs text-gray-500">Select Image / Drag & Drop Here...</div>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                        className="px-5 py-2 bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full text-base"
                        onClick={onClose}
                    >
                        <span className='flex items-center gap-2 text-[#888888]'><IconX size={16} />Close</span>
                    </button>
                    <button
                        className="px-5 py-2 bg-[#2B4C88] hover:bg-blue-600 text-white rounded-full text-base disabled:opacity-50"
                        onClick={handleSave}
                        disabled={!formData.name || !formData.age || !formData.gender || !formData.category}
                    >
                        <span className='flex items-center gap-2'><IconCheck size={16} />Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
} 