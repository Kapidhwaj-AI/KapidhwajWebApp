import { NearbyHubs } from '@/components/device/NearbyHubs'
import { SavedCameras } from '@/components/device/SavedCameras'
import { SavedHubs } from '@/components/device/SavedHubs'
import { AddNewFolderDialogue } from '@/components/dialogue/AddNewFolderDialogue'
import { AddNewSiteDialogue } from '@/components/dialogue/AddNewSiteDialogue'


import { ManageDeviceViewProp } from '@/models/settings'

import { useTranslations } from 'next-intl'
import React from 'react'

const ManageDeviceView: React.FC<ManageDeviceViewProp> = ({ setIsOpen, sites, selectedSite, setSelectedSite, setSiteModalOpen, isSavedHubLoading, setAddFolderModalOpen, setSelectedHub, selectedHub, siteModalOpen, isAddFolderModalOpen, fetchSavedHubs, isHubLoading, fetchHub, nearbyHubs, savedHubs, toggleStream, handleCopyIp, isDelete, setIsDelete, handleDelete, isHubDelete, setIsHubDelete, handleDeleteHub }) => {
  const t = useTranslations()
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-7">

        <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold ml-2 md:ml-5 whitespace-nowrap">
          {t('settings.manage_devices')}
        </h1>

        {/* <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          <button onClick={() => setSiteModalOpen(true)} className={filterButtonClassname}>
            <IconMapPinFilled stroke={1} size={24} className="dark:text-white" />
            <span className="hidden sm:inline dark:text-white">Manage Sites</span>
          </button>
          <button
            onClick={() => setAddFolderModalOpen(true)}
            className={filterButtonClassname}
          >
            <IconFolderPlus stroke={1.5} size={20} />
            <span className="hidden sm:inline">Manage Rooms</span>
          </button>
        </div> */}
      </div>

      {/* Main Content - Fills Remaining Height */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 md:gap-7 min-h-0 px-2 md:px-4 pb-3">
        {/* Left Column */}
        <div className="flex-[3] flex flex-col gap-3 md:gap-5 min-h-0">
          {/* Nearby Hubs Component - Exactly 50% height */}
          <div className="flex-1 min-h-0">
            <NearbyHubs handleNearbyAdd={handleCopyIp} nearbyHubs={nearbyHubs} isHubLoading={isHubLoading} fetchHub={fetchHub} className="h-full" />
          </div>

          {/* Saved Hubs Component - Exactly 50% height */}
          <div className="flex-1 min-h-0">
            <SavedHubs setIsOpen={setIsOpen} isDelete={isHubDelete} setIsDelete={setIsHubDelete} handleDeleteHub={handleDeleteHub} fetchSavedHubs={fetchSavedHubs} isSavedHubLoading={isSavedHubLoading} savedHubs={savedHubs} className="h-full" onHubSelect={setSelectedHub} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-[4] flex flex-col min-h-0">
          <div className="h-full bg-[var(--surface-100)] rounded-2xl md:rounded-4xl">
            {selectedHub ? (
              <SavedCameras camLoading={isSavedHubLoading} fetchSavedHubs={fetchSavedHubs} sites={sites} selectedSite={selectedSite} setSelectedSite={setSelectedSite} handleDelet={handleDelete} isDelete={isDelete} toggleStream={toggleStream} hub={selectedHub} setIsDelete={setIsDelete} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>{t('manage_hubs.select_hub_to_view_cameras')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddNewSiteDialogue
        isOpen={siteModalOpen}
        onClose={() => setSiteModalOpen(false)}
      />
      <AddNewFolderDialogue
        isOpen={isAddFolderModalOpen}
        onClose={() => setAddFolderModalOpen(false)}
      />

    </div>
  )
}

export default ManageDeviceView


