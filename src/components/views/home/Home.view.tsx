import { HomeProfileCardController } from '@/controllers/home/Home.profile.card.controller'
import { NotificationBadgeController } from '@/controllers/home/Notification.badge.controller'
import React from 'react'
import NearbyHubsHome from './NearbyHubsHome'
import SavedHubsHome from './SavedHubsHome'
import { HomeViewProps } from '@/models/home'

const HomeView: React.FC<HomeViewProps> = ({ isRemotely, isHubLoading, isSavedHubLoading, nearbyHubs, savedHubs, fetchHub, fetchSavedHubs, handleAccessRemotely }) => {
    return (
        <div className="h-full flex flex-col gap-4 min-h-0">
            <div className="flex items-center justify-between px-4">
                <HomeProfileCardController />

                <div className="relative">
                    <NotificationBadgeController />
                </div>
            </div>

            <div className="grid grid-cols-1 h-full flex-grow md:grid-cols-2 gap-4 min-h-0">
                <NearbyHubsHome isHubLoading={isHubLoading} fetchHub={fetchHub} nearbyHubs={nearbyHubs} />
                <SavedHubsHome isRemotely={isRemotely} handleAccessRemotely={handleAccessRemotely} isSavedHubLoading={isSavedHubLoading} fetchSavedHubs={fetchSavedHubs} savedHubs={savedHubs} />
            </div>
        </div>
    )
}

export default HomeView