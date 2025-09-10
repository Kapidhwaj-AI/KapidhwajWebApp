const CameraDetailsViewToggleButton = dynamic(() => import("@/components/camera/CameraDetailsViewToggleButton").then((mod) => mod.CameraDetailsViewToggleButton),
    { ssr: false });
const ColumnDropdown = dynamic(() => import("@/components/camera/ColumnDropdown"),
    { ssr: false });
const OrganizationFilterButtons = dynamic(() => import("@/components/camera/OrganizationFilterButtons"),
    { ssr: false });
const SearchBar = dynamic(() => import("@/components/common/Searchbar"),
    { ssr: false });

import CameraStreamCard from '@/components/camera/CameraStreamCard'
import { cn } from '@/lib/utils'
import { StreamsViewProps } from '@/models/stream'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic';
import React from 'react'

const StreamsView: React.FC<StreamsViewProps> = ({searchQuery, selectedChildFolder, setSearchQuery, setSelectedChildFolder, selectedData, selectedFolder, visibleCameras, cameraCount, selectedOrganization, isLoading, organizations, handleFolderSelect, handleOrganizationSelect, toogleColumnValue,}) => {
    const t = useTranslations()
  return (
      <div className="flex flex-col  scrollbar-hide gap-4 p-4">
          <div className="flex flex-wrap justify-between items-center">
              <h1 className="text-2xl font-bold">{t('streams.title')}</h1>
              <div className="flex md:flex-row flex-col gap-2">
                  <CameraDetailsViewToggleButton />
                  <ColumnDropdown />
                  <SearchBar
                      search={searchQuery}
                      setSearch={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("streams.search_placeholder")}
                  />
              </div>
          </div>
          <div className="">
              <div className="flex flex-wrap gap-2 items-center">
                  <p className="text-gray-400">{t('settings.sites')}:</p>
                  <OrganizationFilterButtons
                      isLoading={isLoading}
                      organizations={organizations}
                      onOrganizationSelect={handleOrganizationSelect}
                      selectedId={selectedOrganization?.id}
                  />
              </div>
              {selectedOrganization && selectedOrganization?.folders?.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                      <p className="text-gray-400">{t('settings.folders')}:</p>
                      <OrganizationFilterButtons
                          isLoading={isLoading}
                          folders={selectedOrganization.folders}
                          onSelectedFolder={handleFolderSelect}
                          selectedId={selectedFolder?.id}
                      />
                  </div>
              )}
              {selectedFolder && selectedFolder && selectedFolder?.child_folders?.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                      <p className="text-gray-400">{t('settings.subfolders')}:</p>
                      <OrganizationFilterButtons
                          isLoading={isLoading}
                          childFolders={selectedFolder.child_folders}
                          onSelectedChild={setSelectedChildFolder}
                          selectedId={selectedChildFolder?.id}
                      />
                  </div>
              )}
          </div>
          <h4 className="text-xl dark:text-white"> {t('streams.showing_streams', { count: cameraCount })}</h4>
          {selectedData ? (
              <div className={cn("grid grid-cols-1 gap-6  overflow-y-auto scrollbar-hide p-2",
                  {
                      "md:grid-cols-1": toogleColumnValue === 1,
                      "md:grid-cols-2": toogleColumnValue === 2,
                      "md:grid-cols-3": toogleColumnValue === 3,
                      "md:grid-cols-4": toogleColumnValue === 4,
                      "md:grid-cols-5": toogleColumnValue === 5,
                  }
              )}>
                  {visibleCameras?.map((camera) => {
                      return (
                          <CameraStreamCard
                              key={camera.camera_id}
                              camera={camera}
                          />
                      )
                  })}
              </div>

          ) :
              <div className="text-center text-gray-500">
                  Please select an organization to view its cameras
              </div>
          }

          {selectedOrganization && visibleCameras?.length === 0 && (
              <div className="text-center text-gray-500">
                  No cameras found
              </div>
          )}
      </div>
  )
}

export default StreamsView