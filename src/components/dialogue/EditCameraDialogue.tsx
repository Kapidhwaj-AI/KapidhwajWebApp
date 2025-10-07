import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';

interface EditCameraDialogueProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        ipAddress: string;
        name: string;
        siteName: string;
        roomName: string;
    };
}

export function EditCameraDialogue({ isOpen, onClose, initialData }: EditCameraDialogueProps) {
    const [ipAddress, setIpAddress] = useState(initialData?.ipAddress || '');
    const [name, setName] = useState(initialData?.name || '');
    const [siteName, setSiteName] = useState(initialData?.siteName || '');
    const [roomName, setRoomName] = useState(initialData?.roomName || '');

    const handleSave = () => {
      
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 dark:bg-white/20 flex items-center justify-center z-50">
            <div className="bg-[var(--surface-200)] rounded-[50px] w-[95%] lg:w-2xl max-w-[800px] max-h-[97vh] px-10 pt-5 pb-4 shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Edit Camera</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-[var(--surface-150)]"
                    >
                        <IconX size={20} color='red' />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        {/* IP Address Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">IP Address</label>
                            <input
                                type="text"
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                placeholder="Enter IP Address here..."
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Name here..."
                                className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className='flex justify-between gap-5'>
                            {/* Site Name Field */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-2">Site Name</label>
                                <input
                                    type="text"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    placeholder="Enter Site Name here..."
                                    className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Room Name Field */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-2">Room Name</label>
                                <input
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    placeholder="Enter Room Name here..."
                                    className="w-full h-[45px] px-4 text-base bg-[var(--surface-150)] hover:bg-[var(--surface-100)] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-10">
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
        </div>
    );
} 