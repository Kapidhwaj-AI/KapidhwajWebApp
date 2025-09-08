import Spinner from '@/components/ui/Spinner';
import { getLocalStorageItem } from '@/lib/storage';
import { Hub, ManageHub } from '@/models/settings';
import { RootState } from '@/redux/store';
import { IconRefresh, IconRouter } from '@tabler/icons-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
interface NearbyHubsProps {
    isHubLoading: boolean;
    fetchHub: () => void;
    nearbyHubs: ManageHub[];
    handleAccessRemotely: (hub: ManageHub) => void
    commonHubs: Hub[]
}
const NearbyHubsHome: React.FC<NearbyHubsProps> = ({ isHubLoading, fetchHub, nearbyHubs, handleAccessRemotely, commonHubs }) => {
    const t = useTranslations()
    const storedLocalHub = JSON.parse(getLocalStorageItem('Localhub') ?? '{}')
    const storedHub = useSelector((state: RootState) => state.hub.localHub)
    return (
        <div className={`flex flex-col bg-[var(--surface-100)] px-8 rounded-2xl md:rounded-4xl`}>
            {/* Header - Fixed height */}
            <div className="flex justify-between items-center pt-4 pb-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <IconRouter size={24} className="text-[var(--text-color)]" />
                    <h2 className="text-sm font-bold">{t('manage_hubs.nearby_hubs')}</h2>
                </div>
                <button
                    onClick={fetchHub}
                    disabled={isHubLoading}
                    className="p-2 hover:bg-[var(--surface-200)] rounded-full transition-colors disabled:opacity-50"
                >
                    <IconRefresh
                        size={20}
                        className={`text-gray-600 ${isHubLoading ? 'animate-spin' : ''}`}
                    />
                </button>
            </div>
            {isHubLoading ? <Spinner /> : nearbyHubs.length === 0 ? <div className="flex justify-center items-center w-full h-full">
                {t(`manage_hubs.couldn't_get_nearby_hubs`)}
            </div> :
                <div className="flex-1 overflow-y-auto min-h-0 max-h-[calc(100%-5rem)] pb-4 scrollbar-hide">
                    <div className="space-y-3">
                        {nearbyHubs?.map((hub) => (
                            <div key={hub.ip} className={`${hub.name === (storedHub?.id || storedLocalHub.id) ? 'border-2 border-[#2B4C88] ' : ''} flex items-center p-3 bg-[var(--surface-200)] hover:bg-[var(--surface-300)] rounded-xl transition-colors`}>
                                <div className="w-10 h-10 bg-[var(--surface-100)] rounded-lg flex items-center justify-center">
                                    <IconRouter size={20} className="text-[#888888]" />
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{hub.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{hub.ip}</p>
                                </div>
                                { <button onClick={() => handleAccessRemotely(hub)} className='bg-[#2B4C88] rounded-lg p-2 text-white'>Access Locally</button>}

                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default NearbyHubsHome