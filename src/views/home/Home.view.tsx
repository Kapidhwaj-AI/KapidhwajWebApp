import { HomeProfileCardController } from '@/controllers/home/Home.profile.card.controller'
import { NotificationBadgeController } from '@/controllers/home/Notification.badge.controller'
import React from 'react'
import NearbyHubsHome from './NearbyHubsHome'
import SavedHubsHome from './SavedHubsHome'
import { HomeViewProps } from '@/models/home'
import { useTranslations } from 'next-intl'

const HomeView: React.FC<HomeViewProps> = ({ handleNearbyHubsAccess, setIsSiteAddModal, setIsAddModal, devices, isRemotely, isHubLoading, isSavedHubLoading, nearbyHubs, savedHubs, fetchHub, fetchSavedHubs, handleAccessRemotely }) => {
    const t = useTranslations()
    return (
        <div className="h-full flex flex-col gap-4 min-h-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2  items-start justify-between md:px-4 ">
                <HomeProfileCardController devices={devices} />

                <div className="relative flex md:gap-3 self-end gap-1">
                    <button onClick={() => { setIsSiteAddModal(true) }} className='bg-[#2B4C88] rounded-full self-center p-2 px-3 text-white'>{t('settings.add_site')}</button>
                    <NotificationBadgeController />
                </div>
            </div>

            <div className="grid grid-cols-1 h-full flex-grow md:grid-cols-2 gap-4 min-h-0">
                <NearbyHubsHome handleAccessRemotely={handleNearbyHubsAccess} isHubLoading={isHubLoading} fetchHub={fetchHub} nearbyHubs={nearbyHubs} />
                <SavedHubsHome setIsAddModal={setIsAddModal} isRemotely={isRemotely} handleAccessRemotely={handleAccessRemotely} isSavedHubLoading={isSavedHubLoading} fetchSavedHubs={fetchSavedHubs} savedHubs={savedHubs} />
            </div>
        </div>
    )
}

export default HomeView