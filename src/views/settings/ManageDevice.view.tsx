import Spinner from '@/components/ui/Spinner'
import { ManageDeviceViewProp } from '@/models/settings'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import React from 'react'
const SavedCameras = dynamic(() => import('@/components/device/SavedCameras').then((mod) => mod.SavedCameras), { loading: () => <Spinner /> })

const ManageDeviceView: React.FC<ManageDeviceViewProp> = ({  sites, selectedSite, setSelectedSite, isSavedHubLoading,  selectedHub, fetchSavedHubs, toggleStream,  isDelete, setIsDelete, handleDelete, }) => {
  const t = useTranslations()
  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 px-2 md:px-4 pt-2 md:pt-3 pb-4">

        <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold ml-2 md:ml-5 whitespace-nowrap">
          {t('settings.manage_devices')}
        </h1>
      </div>
      <div className="grid grid-cols-1 h-full px-2 md:px-4 pb-3">
        <div className="flex flex-col min-h-0">
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
    </div>
  )
}

export default ManageDeviceView


