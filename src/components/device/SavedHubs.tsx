'use client';

import { Hub} from "@/models/settings";
import { IconChevronRight, IconRefresh, IconRouter, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { DeleteDialog } from "../dialogue/DeleteDialog";
import { useTranslations } from "next-intl";


interface SavedHubsProps {
    className?: string;
    onHubSelect?: (hub: Hub | null) => void;
    savedHubs: Hub[];
    isSavedHubLoading: boolean;
    fetchSavedHubs: () => void;
    handleDeleteHub: (id: string) => void;
    setIsDelete: (val: boolean) => void;
    isDelete: boolean;
    setIsOpen:(val:boolean) => void
}

export const SavedHubs: React.FC<SavedHubsProps> = ({ className = "", setIsOpen, onHubSelect, isSavedHubLoading, savedHubs, fetchSavedHubs, setIsDelete, isDelete, handleDeleteHub }) => {
    const [hubId, setHubId] = useState('')
    const handleDelete = (id: string) => {
        setHubId(id)
        setIsDelete(true)
    };

    const handleNavigate = (hub: Hub) => {
        onHubSelect?.(hub);
        setHubId(hub.id)
    };
    const t = useTranslations()
    return (
        <div className={`flex flex-col bg-[var(--surface-100)] px-8 pb-2 rounded-2xl md:rounded-4xl ${className}`}>
            <div className="flex justify-between items-center pt-4 pb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <IconRouter size={24} className="text-[var(--text-color)]" />
                    <h2 className="text-sm font-bold">{t('manage_hubs.saved_hubs')}</h2>
                </div>
                <button
                    onClick={fetchSavedHubs}
                    disabled={isSavedHubLoading}
                    className="p-2 hover:bg-[var(--surface-200)] rounded-full transition-colors disabled:opacity-50"
                >
                    <IconRefresh
                        size={20}
                        className={`text-gray-600 ${isSavedHubLoading ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>
            {isSavedHubLoading ? <Spinner /> : savedHubs.length === 0 ? <div className="flex items-center justify-center w-full h-full">
                {t('manage_hubs.no_hubs_available')}
            </div>:
                <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-5rem)] pb-4 scrollbar-hide">
                    <div className="space-y-3">
                        {savedHubs?.map((hub, index) => (
                            <div key={index} className={`group flex items-center p-3 ${hub.id === hubId ? 'bg-[var(--surface-300)]' :'bg-[var(--surface-200)]'}  hover:bg-[var(--surface-300)] rounded-xl transition-colors`}>
                                <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                    <IconRouter size={20} className="text-[#888888]" />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleDelete(hub.id)}
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
            }
            <button onClick={() => setIsOpen(true)} className='bg-[#2B4C88] rounded-2xl px-5 py-1 self-end text-white'>Add</button>
            {isDelete && <DeleteDialog title={t('settings.delete_hub_confirm')} data={hubId} handleDelete={handleDeleteHub} onClose={() => setIsDelete(false)} />}
        </div>
    );
};