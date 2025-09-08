import Spinner from '@/components/ui/Spinner';
import { getLocalStorageItem } from '@/lib/storage';
import { Hub } from '@/models/settings';
import { RootState } from '@/redux/store';
import { IconRefresh, IconRouter } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useSelector } from 'react-redux';

interface SavedHubsProps {
    savedHubs: Hub[];
    isSavedHubLoading: boolean;
    fetchSavedHubs: () => void;
    handleAccessRemotely: (hub: Hub) => void;
    setIsAddModal: (val: boolean) => void
}

const SavedHubsHome: React.FC<SavedHubsProps> = ({ savedHubs, setIsAddModal, isSavedHubLoading, fetchSavedHubs, handleAccessRemotely, }) => {
    const t = useTranslations()
    const storedRemoteHub = JSON.parse(getLocalStorageItem('Remotehub') ?? '{}')
    const storedHub = useSelector((state: RootState) => state.hub.remoteHub)
    return (
        <div className={`flex flex-col bg-[var(--surface-100)] px-8 pb-4 rounded-2xl md:rounded-4xl `}>
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
            </div> :
                <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-5rem)]  pb-4 scrollbar-hide">
                    <div className="space-y-3">
                        {savedHubs?.map((hub, index) => (
                            <div key={index} className={`${hub.id === (storedHub?.id || storedRemoteHub.id) ?'border-2 border-[#2B4C88] ':''}  group flex items-center p-3  bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors`}>
                                <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                    <IconRouter size={20} className="text-[#888888]" />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                                </div>
                                <button onClick={() => handleAccessRemotely(hub)} className='bg-[#2B4C88] rounded-lg p-2 text-white'> Access Remotely</button>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <button onClick={() => setIsAddModal(true)} className='bg-[#2B4C88] rounded-2xl px-5 py-1 self-end text-white'>Add</button>
        </div>
    )
}

export default SavedHubsHome