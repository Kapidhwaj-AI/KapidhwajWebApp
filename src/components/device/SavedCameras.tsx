import { IconDeviceCctv, IconDeviceCctvFilled, IconEdit, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Switch } from "../ui/CustomeSwitch";
import { AddNewCameraDialogue } from '@/components/dialogue/AddNewCameraDialogue';
import { useState } from "react";
import { EditCameraDialogue } from "../dialogue/EditCameraDialogue";

interface Camera {
    id: string;
    name: string;
    ip: string;
    location: string;
    isActive: boolean;
}

interface Hub {
    name: string;
    ip: string;
}

interface SavedCamerasProps {
    hub: Hub;
    className?: string;
}
export const cameras: Camera[] = [
    { id: '1', name: 'Camera 1', ip: '10.0.0.125', location: 'Reception Area', isActive: true },
    { id: '2', name: 'Camera 2', ip: '10.0.0.126', location: 'Reception Area', isActive: true },
    { id: '3', name: 'Camera 3', ip: '10.0.0.127', location: 'Main Office Area', isActive: false },
    { id: '4', name: 'Camera 4', ip: '10.0.0.128', location: 'Main Office Area', isActive: true },
    { id: '5', name: 'Camera 5', ip: '10.0.0.129', location: 'Second Floor', isActive: true },
    { id: '1', name: 'Camera 1', ip: '10.0.0.125', location: 'Reception Area', isActive: true },
    { id: '2', name: 'Camera 2', ip: '10.0.0.126', location: 'Reception Area', isActive: true },
    { id: '3', name: 'Camera 3', ip: '10.0.0.127', location: 'Main Office Area', isActive: false },
    { id: '4', name: 'Camera 4', ip: '10.0.0.128', location: 'Main Office Area', isActive: true },
    { id: '5', name: 'Camera 5', ip: '10.0.0.129', location: 'Second Floor', isActive: true },
    { id: '1', name: 'Camera 1', ip: '10.0.0.125', location: 'Reception Area', isActive: true },
    { id: '2', name: 'Camera 2', ip: '10.0.0.126', location: 'Reception Area', isActive: true },
    { id: '3', name: 'Camera 3', ip: '10.0.0.127', location: 'Main Office Area', isActive: false },
    { id: '4', name: 'Camera 4', ip: '10.0.0.128', location: 'Main Office Area', isActive: true },
    { id: '5', name: 'Camera 5', ip: '10.0.0.129', location: 'Second Floor', isActive: true },
    { id: '1', name: 'Camera 1', ip: '10.0.0.125', location: 'Reception Area', isActive: true },
    { id: '2', name: 'Camera 2', ip: '10.0.0.126', location: 'Reception Area', isActive: true },
    { id: '3', name: 'Camera 3', ip: '10.0.0.127', location: 'Main Office Area', isActive: false },
    { id: '4', name: 'Camera 4', ip: '10.0.0.128', location: 'Main Office Area', isActive: true },
    { id: '5', name: 'Camera 5', ip: '10.0.0.129', location: 'Second Floor', isActive: true },
    { id: '1', name: 'Camera 1', ip: '10.0.0.125', location: 'Reception Area', isActive: true },
    { id: '2', name: 'Camera 2', ip: '10.0.0.126', location: 'Reception Area', isActive: true },
    { id: '3', name: 'Camera 3', ip: '10.0.0.127', location: 'Main Office Area', isActive: false },
    { id: '4', name: 'Camera 4', ip: '10.0.0.128', location: 'Main Office Area', isActive: true },
    { id: '5', name: 'Camera 5', ip: '10.0.0.129', location: 'Second Floor', isActive: true },
];
export const SavedCameras: React.FC<SavedCamerasProps> = ({ hub, className = "" }) => {
    // This would typically come from an API or state management

    const [isEditCameraOpen, setIsEditCameraOpen] = useState(false);
    const [isAddCameraOpen, setIsAddCameraOpen] = useState(false);

    const handleAddCamera = () => {
        setIsAddCameraOpen(true);
    };

    const handleToggleCamera = (id: string) => {
        // Handle toggle camera
        console.log('Toggle camera:', id);
    };

    const handleEditCamera = (id: string) => {
        setIsEditCameraOpen(true);
        console.log('Edit camera:', id);
    };

    const handleDeleteCamera = (id: string) => {
        // Handle delete camera
        console.log('Delete camera:', id);
    };

    return (
        <>
            <div className={`flex flex-col h-full px-8  ${className}`}>
                {/* Header */}
                <div className="flex justify-between items-center pt-6 pb-5 flex-shrink-0">
                    <div>
                        <h2 className="text-sm font-bold">{hub.name}</h2>
                        <p className="text-sm text-gray-500">{hub.ip}</p>
                    </div>
                    <button
                        onClick={handleAddCamera}
                        className="flex items-center gap-2 shadow-md px-4 py-2 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors"
                    >
                        <IconPlus size={18} />
                        <span className="text-sm">Add New Camera</span>
                    </button>
                </div>

                {/* Cameras List */}
                <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-6rem)]  pb-4 scrollbar-hide">
                    <div className="space-y-3">
                        {cameras.map((camera, index) => (
                            <div
                                key={camera.id + index}
                                className="flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors"
                            >
                                <div className="w-15 h-15 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                    <IconDeviceCctvFilled size={20} className="text-[#888888]" />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{camera.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-gray-500 truncate">{camera.ip}</p>
                                        <span className="text-xs text-gray-400">•</span>
                                        <p className="text-xs text-gray-500 truncate">{camera.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Switch
                                        key={camera.id}
                                        enabled={camera.isActive}
                                        onChange={() => handleToggleCamera(camera.id)}
                                        trackColor="bg-[#EFEFEF]"
                                    />
                                    <button
                                        onClick={() => handleEditCamera(camera.id)}
                                        className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                    >
                                        <IconPencil size={24} className="text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCamera(camera.id)}
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
            <AddNewCameraDialogue
                isOpen={isAddCameraOpen}
                onClose={() => setIsAddCameraOpen(false)}
            />
            <EditCameraDialogue
                isOpen={isEditCameraOpen}
                onClose={() => setIsEditCameraOpen(false)}
            />
        </>
    );
}; 