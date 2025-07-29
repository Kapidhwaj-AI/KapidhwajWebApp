import CameraStreamCardMedium from '@/components/camera/CameraStreamCardMedium';
import CameraStreamRecordingCard from '@/components/camera/CameraStreamRecordingCard';
import InfiniteScrolling from '@/components/ui/InfiniteScrolling';
import Spinner from '@/components/ui/Spinner';
import { RecordedClip } from '@/models/clip';
import { IconChevronRight, IconFilter, IconHeart, IconPencil, IconSettings, IconVideo } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import React from 'react'
import AlertsFiltersButtonAtStream from '../../alert/AlertsFiltersButtonAtStream';
import { Alert } from '@/models/alert';
import { AlertCard } from '../../alert/AlertCard';
import { TimeFiltersDialogue } from '@/components/dialogue/TimeFiltersDialogue';
import EditStreamDialogue from '@/components/dialogue/EditStreamDialogue';
import { StreamSettingsDialogue } from '@/components/dialogue/StreamSettingsDialogue';
import { filterButtonClassname } from '@/styles/tailwind-class';
import { StreamsPageViewProps } from '@/models/stream';


const StreamPageView: React.FC<StreamsPageViewProps> = ({ isAiServiceLoading, loading, isDateFiltered, isEdit, isEditLoading, isFullscreen, camera, cameraLocation, toggleStreamFav, makeFav, setIsEdit, selectedTab, setAlertOffset, setAlerts, setAlertsLoading, setDate, setEndTime, setFilterDial, setFormData, setHasMore, setHasRecordingMore, setRecordingLoading, setRecordingOffset, setRecordings, setSelectedTab, setSettingDial, setStartTime, settingDial,
    startTime, stream, fetchAlerts, date, fetchRecordings, filterDial, filteredAlerts, formData, recordingLoading, recordingOffset, recordingref, recordings, alertEndRef, alertOffset, alerts, alertsLoading, handleAiToggle, handleMotionToggle, handleRecordingToggle, handleSave, handleToggleStream, hasMore, hasRecordingMore, endTime, organizations, handleApplyFilter

}) => {
    const t = useTranslations()
    return (
        <div className="h-full flex flex-col gap-3 md:gap-5 min-h-0 px-2 md:px-4 pt-2 md:pt-3">
            {!isFullscreen && <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                {cameraLocation && <h1 className="sm:text-md flex gap-1 items-center md:text-lg lg:text-xl xl:text-2xl font-light ml-2 md:ml-5 whitespace-nowrap">
                    {cameraLocation?.organization} <IconChevronRight className=" text-gray-400" /> {cameraLocation?.parantFolder === "NA" ? '' : <div className=' flex gap-2 items-center'>{cameraLocation?.parantFolder} <IconChevronRight className=" text-gray-400" /></div>}   {camera?.name}
                </h1>}

                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
                    <button className={filterButtonClassname} onClick={toggleStreamFav}>
                        <IconHeart
                            stroke={makeFav ? 0 : 1}
                            size={24}
                            fill={makeFav ? "red" : "transparent"}
                        />
                        <span className="hidden sm:inline">{t('streams.options.favourite')}</span>
                    </button>
                    <button className={filterButtonClassname} onClick={() => setIsEdit(true)}>
                        <IconPencil stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('streams.options.edit_details')}</span>
                    </button>
                    <button
                        className={filterButtonClassname}
                        onClick={() => setSettingDial(true)}
                    >
                        <IconSettings stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('streams.options.settings')}</span>
                    </button>
                    <button
                        className={filterButtonClassname}
                        onClick={() => { setFilterDial(true); setAlertOffset(0) }}
                    >
                        <IconFilter stroke={1} size={24} />
                        <span className="hidden sm:inline">{t('alerts.filter')}</span>
                    </button>
                </div>
            </div>}
            {loading ? <Spinner /> :
                <div className={isFullscreen ? "relative top-0 left-0 right-0 w-full h-full" : "grid grid-cols-1 lg:grid-cols-6 gap-3 md:gap-4 min-h-0"}>
                    <div className="lg:col-span-4  flex flex-col gap-3 md:gap-5 h-full overflow-y-auto scrollbar-hide">
                        <div className={isFullscreen ? 'w-full h-full' : "flex flex-col gap-3 md:gap-5 h-full "}>
                            <CameraStreamCardMedium camera={camera} camLocation={cameraLocation} />
                            {!isFullscreen && <div className="flex  flex-col p-3 md:p-6 rounded-2xl md:rounded-4xl bg-[var(--surface-100)]">
                                <h3 className="text-sm md:text-md flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                                    <IconVideo stroke={2} size={18} />
                                    <span>{t('alerts.recordings')}</span>
                                </h3>
                                <InfiniteScrolling<RecordedClip> setData={setRecordings} fetchData={fetchRecordings} setHasMore={setHasRecordingMore} setIsLoading={setRecordingLoading} setOffset={setRecordingOffset} offset={recordingOffset} isLoading={recordingLoading} data={recordings} divRef={recordingref} hasMore={hasRecordingMore}   >
                                    {recordings.length === 0 ? <p className="flex items-center justify-center w-full h-full">{t('streams.no_recordings')}</p> : <div className="grid grid-cols-1 sm:grid-cols-3  gap-3 md:gap-6">
                                        {recordings.map((item, index) => (
                                            <CameraStreamRecordingCard recording={item} key={index} />
                                        ))}

                                    </div>}
                                    {recordings.length > 0 && <div ref={recordingref} className="h-1" />}
                                </InfiniteScrolling>
                                {recordingLoading && <div className="text-center"><Spinner /></div>}
                                {!recordingLoading && !hasRecordingMore && <p className="text-center">{t('no_more_data')}</p>}
                            </div>}
                        </div>
                    </div>

                    {!isFullscreen && <div className="lg:col-span-2 flex flex-col md:p-5 rounded-2xl overflow-y-auto scrollbar-hide md:rounded-4xl bg-[var(--surface-100)]">
                        <AlertsFiltersButtonAtStream selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                        <div className="grid grid-cols-1 gap-3 md:gap-6 w-full ">
                            <InfiniteScrolling<Alert> setData={setAlerts} setOffset={setAlertOffset} offset={alertOffset} divRef={alertEndRef} data={alerts} fetchData={fetchAlerts} isLoading={alertsLoading} setIsLoading={setAlertsLoading} setHasMore={setHasMore} hasMore={hasMore}>

                                {filteredAlerts.length > 0 ? <>

                                    {filteredAlerts.map((item, index) => (
                                        <AlertCard alert={item} key={index} />
                                    ))}
                                    {!isDateFiltered && <div ref={alertEndRef} className="h-1" />}
                                </> :
                                    <p className="text-center h-full w-full flex items-center justify-center">{t('alerts.no_found')}</p>
                                }
                            </InfiniteScrolling>

                            {alertsLoading && <div className="text-center"><Spinner /></div>}
                            {!alertsLoading && !hasMore && filteredAlerts.length > 0 && <p className="text-center">{t('no_more_data')}</p>}
                        </div>
                    </div>}
                </div>
            }
            {filterDial && <TimeFiltersDialogue
                date={date}
                startTime={startTime}
                endTime={endTime}
                setDate={setDate}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                isOpen={filterDial}
                onClose={() => setFilterDial(false)}
                handleApplyFilter={handleApplyFilter}
            />}
            {isEdit && <EditStreamDialogue
                isLoading={isEditLoading}
                formData={formData}
                onClose={() => setIsEdit(false)}
                setFormData={setFormData}
                folders={organizations?.find((item) => item.id === formData.organizationId)?.folders.map((folder) => ({ key: folder.id.toString(), value: folder.name }))}
                organizations={organizations?.map((item) => ({ key: item.id, value: item.name }))}
                subfolders={organizations?.find((item) => item.id === formData.organizationId)?.folders.find((item) => item.id === formData.folderId)?.child_folders.map((folder) => ({ key: folder.id.toString(), value: folder.name }))}
                isStream={stream}
                handleToggleStream={handleToggleStream}
                handleSave={handleSave}
            />}

            {settingDial && <StreamSettingsDialogue
                loading={isAiServiceLoading}
                fireSmoke={camera ? camera?.is_fire_smoke_detection_active > 0 : false}
                isOpen={settingDial}
                onClose={() => setSettingDial(false)}
                recordings={camera ? camera?.is_record > 0 : false}
                people={camera ? camera?.is_people_count_active > 0 : false}
                motion={camera ? camera?.is_motion_event_active > 0 : false}
                license={camera ? camera?.is_license_plate_detection_active > 0 : false}
                intrusion={camera ? camera?.is_intrusion_active > 0 : false}
                face={camera ? camera.is_ai_stream_active > 0 : false}
                handleAiStremToggle={handleAiToggle}
                handleMotionToggle={handleMotionToggle}
                handleRecordingToggle={handleRecordingToggle}
            />}
        </div>
    )
}

export default StreamPageView