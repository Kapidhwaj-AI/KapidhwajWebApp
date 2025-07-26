import Spinner from '@/components/ui/Spinner';
import { Hub } from '@/models/settings';
import { IconRefresh, IconRouter } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react'

interface SavedHubsProps {
    savedHubs: Hub[];
    isSavedHubLoading: boolean;
    fetchSavedHubs: () => void;
    handleAccessRemotely: (hub: Hub) => void;
    isRemotely: boolean;
}

const SavedHubsHome: React.FC<SavedHubsProps> = ({ savedHubs, isSavedHubLoading, fetchSavedHubs, handleAccessRemotely, isRemotely }) => {
    const t = useTranslations()
    return (
        <div className={`flex flex-col bg-[var(--surface-100)] px-8 pb-2 rounded-2xl md:rounded-4xl `}>
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
                            <div key={index} className={`group flex items-center p-3  bg-white hover:bg-[var(--surface-300)] rounded-xl transition-colors`}>
                                <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                    <IconRouter size={20} className="text-[#888888]" />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                                </div>
                                <button onClick={() => handleAccessRemotely(hub)} className='bg-[#2B4C88] rounded-lg p-2 text-white'> {isRemotely ? 'Access Locally' :'Access Remotely'}</button>
                            </div>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}

export default SavedHubsHome