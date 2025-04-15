'use client';

import { IconChevronRight, IconRefresh, IconRouter, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface Hub {
    name: string;
    ip: string;
}

interface SavedHubsProps {
    className?: string;
    onHubSelect?: (hub: { name: string; ip: string }) => void;
}

export const SavedHubs: React.FC<SavedHubsProps> = ({ className = "", onHubSelect }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = async () => {
        if (isLoading) return; // Prevent multiple clicks while loading

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            // Here you would typically fetch new data
            console.log('Refreshed saved hubs');
        } catch (error) {
            console.error('Error refreshing hubs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const hubs = [
        { name: 'Main Hub', ip: '10.0.0.1' },
        { name: 'Basement Hub', ip: '10.0.0.2' },
        { name: 'Second Floor Hub', ip: '10.0.0.3' },
        { name: 'Reception Hub', ip: '10.0.0.4' },
        { name: 'Conference Room Hub', ip: '10.0.0.5' },
        { name: 'Security Office Hub', ip: '10.0.0.6' },
        { name: 'Cafeteria Hub', ip: '10.0.0.7' },
        { name: 'Parking Hub', ip: '10.0.0.8' },
        { name: 'Server Room Hub', ip: '10.0.0.9' },
        { name: 'Executive Hub', ip: '10.0.0.10' },
        { name: 'Training Room Hub', ip: '10.0.0.11' },
        { name: 'Lobby Hub', ip: '10.0.0.12' },
    ];

    const handleDelete = (ip: string) => {
        // Handle delete functionality
        console.log('Delete hub:', ip);
    };

    const handleNavigate = (hub: { name: string; ip: string }) => {
        onHubSelect?.(hub);
    };

    return (
        <div className={`flex flex-col bg-[var(--surface-100)] px-8 rounded-2xl md:rounded-[60px] ${className}`}>
            <div className="flex justify-between items-center pt-4 pb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <IconRouter size={24} className="text-gray-600" />
                    <h2 className="text-sm font-bold">Saved Hubs</h2>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="p-2 hover:bg-[var(--surface-200)] rounded-full transition-colors disabled:opacity-50"
                >
                    <IconRefresh
                        size={20}
                        className={`text-gray-600 ${isLoading ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-5rem)] pb-4 scrollbar-hide">
                <div className="space-y-3">
                    {hubs.map((hub) => (
                        <div key={hub.ip} className="group flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors">
                            <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                <IconRouter size={20} className="text-gray-600" />
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleDelete(hub.ip)}
                                    className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                >
                                    <IconTrash size={18} className="text-[#FF6868]" />
                                </button>
                                <button
                                    onClick={() => handleNavigate(hub)}
                                    className="p-1.5 hover:bg-[var(--surface-400)] rounded-lg transition-colors"
                                >
                                    <IconChevronRight size={18} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};