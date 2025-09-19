import Spinner from '@/components/ui/Spinner'
import { ManageDeviceViewProp } from '@/models/settings'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import React from 'react'
const NearbyHubs = dynamic(() => import('@/components/device/NearbyHubs').then((mod) => mod.NearbyHubs), { loading: () => <Spinner /> })
const SavedCameras = dynamic(() => import('@/components/device/SavedCameras').then((mod) => mod.SavedCameras), { loading: () => <Spinner /> })
const SavedHubs = dynamic(() => import('@/components/device/SavedHubs').then((mod) => mod.SavedHubs), { loading: () => <Spinner /> })

const ManageDeviceView: React.FC<ManageDeviceViewProp> = ({ setIsOpen, sites, selectedSite, setSelectedSite, isSavedHubLoading, setSelectedHub, selectedHub, fetchSavedHubs, isHubLoading, fetchHub, nearbyHubs, savedHubs, toggleStream, handleCopyIp, isDelete, setIsDelete, handleDelete, isHubDelete, setIsHubDelete, handleDeleteHub }) => {
  const t = useTranslations()
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-4">

        <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold ml-2 md:ml-5 whitespace-nowrap">
          {t('settings.manage_devices')}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-7 h-full px-2 md:px-4 pb-3 min-h-0">
        <div className="flex md:col-span-2 flex-col gap-3 md:gap-5 h-full">
          <div className="flex-1">
            <NearbyHubs
              handleNearbyAdd={handleCopyIp}
              nearbyHubs={nearbyHubs}
              isHubLoading={isHubLoading}
              fetchHub={fetchHub}
              className="md:h-full"
            />
          </div>
          <div className="flex-1 ">
            <SavedHubs
              setIsOpen={setIsOpen}
              isDelete={isHubDelete}
              setIsDelete={setIsHubDelete}
              handleDeleteHub={handleDeleteHub}
              fetchSavedHubs={fetchSavedHubs}
              isSavedHubLoading={isSavedHubLoading}
              savedHubs={savedHubs}
              className="md:h-full"
              onHubSelect={setSelectedHub}
            />
          </div>
        </div>

        <div className="md:col-span-3 bg-[var(--surface-100)] col-span-1 md:h-full md:max-h-full h-[36vh] max-h-[36vh] min-h-0 overflow-y-auto scrollbar-hide rounded-2xl md:rounded-4xl">
          {selectedHub ? (
            <SavedCameras camLoading={isSavedHubLoading} fetchSavedHubs={fetchSavedHubs} sites={sites} selectedSite={selectedSite} setSelectedSite={setSelectedSite} handleDelet={handleDelete} isDelete={isDelete} toggleStream={toggleStream} hub={selectedHub} setIsDelete={setIsDelete} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>{t('manage_hubs.select_hub_to_view_cameras')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ManageDeviceView


