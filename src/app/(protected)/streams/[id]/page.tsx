"use client";

import { AlertCard } from "@/components/views/alert/AlertCard";
import AlertsFiltersButtonAtStream from "@/components/views/alert/AlertsFiltersButtonAtStream";
import CameraStreamCardMedium from "@/components/camera/CameraStreamCardMedium";
import CameraStreamRecordingCard from "@/components/camera/CameraStreamRecordingCard";
import { BackButton } from "@/components/common/BackButton";
import { TimeFiltersDialogue } from "@/components/dialogue/TimeFiltersDialogue";
import { StreamSettingsDialogue } from "@/components/dialogue/StreamSettingsDialogue";
import InfiniteScrolling from "@/components/ui/InfiniteScrolling";
import Spinner from "@/components/ui/Spinner";
import { protectApi } from "@/lib/protectApi";
import { Alert } from "@/models/alert";
import { Camera, CameraLocation } from "@/models/camera";
import { RecordedClip } from "@/models/clip";
import { filterButtonClassname } from "@/styles/tailwind-class";
import {
  IconFilter,
  IconHeart,
  IconPencil,
  IconSettings,
  IconVideo,
} from "@tabler/icons-react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { getUtcTimestamp } from "@/utils/getUTCTimestamp";
import EditStreamDialog from "@/components/dialogue/EditStreamDialog";
import { useOrganizations } from "@/hooks/useOrganizations";
import { Organization } from "@/models/organization";
import { StreamFormData } from "@/models/stream";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";

function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [filterDial, setFilterDial] = useState(false);
  const [settingDial, setSettingDial] = useState(false);
  const [loading, setLoading] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [alertsError, setAlertsError] = useState('')
  const [recordingsError, setRecordingsError] = useState('')
  const [recordingOffset, setRecordingOffset] = useState(0)
  const [isEdit, setIsEdit] = useState(false)
  const [alertOffset, setAlertOffset] = useState(0)
  const [makeFav, setMakeFav] = useState(false);
  const [camera, setCamera] = useState<Camera>()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [recordings, setRecordings] = useState<RecordedClip[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [alertsLoading, setAlertsLoading] = useState(false)
  const alertEndRef = useRef(null)
  const [organization, selectOrganization] = useState<Organization[]>([])
  const [cameraLocation, setCameraLocation] = useState<CameraLocation>()
  const [hasRecordingMore, setHasRecordingMore] = useState(true)
  const [recordingLoading, setRecordingLoading] = useState(false)
  const recordingref = useRef(null)
  const [selectedTab, setSelectedTab] = useState('all')
  const [date, setDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();
  const [isDateFiltered, setIsDateFiltered] = useState(false)
  const [formData, setFormData] = useState<StreamFormData>({
    name: camera?.name ?? '',
    people_threshold_count: camera?.people_threshold_count ?? NaN,
    organizationId: camera?.organization_id ?? '',
    folderId: cameraLocation?.parantFolderId ?? NaN,
    subfolder: cameraLocation?.folderId ?? NaN
  });
  const [isEditLoading, setIsEditLoading] = useState(false)
  const [stream, setStream] = useState(false)
  const t = useTranslations()
  const { data: organizations, isLoading, error } = useOrganizations(undefined, {
    onSuccess: (data) => {
      selectOrganization(data);
    }
  });
  const fetchCamera = async (id: string) => {
    const res = await protectApi<Camera, undefined>(`/camera?cameraId=${id}`)
    return res.data.data
  }
  const fetchCameraLocation = async () => {
    const res = await protectApi<CameraLocation, undefined>(`/camera/cam-details?cameraId=${id}`)
    return res.data.data
  }
  const fetchAlerts = async (offset: number, startTime?: number, endTime?: number) => {
    const endpoint = startTime ? `/alert/recent?offset=${offset}&cameraId=${id}&startUtcTimestamp=${startTime}&endUtcTimestamp=${endTime}` : `/alert/recent?offset=${offset}&cameraId=${id}`
    const res = await protectApi<Alert[]>(endpoint)
    return res.data.data
  }
  const fetchRecordings = async (offset: number) => {
    const res = await protectApi<RecordedClip[]>(`/recorded-clip?cameraId=${id}&offset=${offset}`)
    return res.data.data
  }
  const fetchIsFav = async (id: string) => {
    const res = await protectApi<{ is_fav: boolean }>(`/camera/fav-status?cameraId=${id}`)
    return res.data.data
  }


  useEffect(() => {
    setLoading(true);
    setCameraError("");
    setAlertsError("")
    setRecordingsError("")
    Promise.allSettled([
      fetchCamera(id),
      fetchAlerts(alertOffset),
      fetchRecordings(recordingOffset),
      fetchIsFav(id),
      fetchCameraLocation()
    ])
      .then(([camRes, alertsRes, recRes, isFav, location]) => {
        const newFormData: Partial<StreamFormData> = {};
        if (camRes.status === "fulfilled") {
          setCamera(camRes.value);
          setStream(camRes.value.is_ai_stream_active !== 0);
          newFormData.name = camRes.value.name ?? '';
          newFormData.people_threshold_count = camRes.value.people_threshold_count ?? 0;
          newFormData.organizationId = camRes.value.organization_id ?? '';

        }
        else { setCameraError("Error while fetching camera data") }
        if (alertsRes.status === "fulfilled") setAlerts(alertsRes.value);
        else { setAlertsError("Error while fetching Alerts data") }

        if (recRes.status === "fulfilled") setRecordings(recRes.value);
        else { setRecordingsError("Error while fetching camera data") }
        if (isFav.status === "fulfilled") setMakeFav(isFav.value.is_fav);
        if (location.status === 'fulfilled') {
          setCameraLocation(location.value);
          newFormData.folderId =
            location.value?.parantFolderId !== "NA"
              ? Number(location.value?.parantFolderId)
              : null;
          newFormData.subfolder =
            location.value?.folderId !== "NA"
              ? Number(location.value?.folderId)
              : null;

        }
        setFormData((prev) => ({ ...prev, ...newFormData }));
      })
      .finally(() => setLoading(false));
  }, [id]);



  const filteredAlerts = useMemo(() => {
    if (selectedTab === "all") return alerts;

    return alerts.filter((alert) => alert.alertType === selectedTab);
  }, [alerts, selectedTab]);

  const toggleStreamFav = async () => {
    const res = await protectApi<any, { cameraId: number }>(`/camera/fav?cameraId=${id}`, makeFav ? 'DELETE' : 'POST', { cameraId: Number(id) })
    if (res.status === 200) {
      setMakeFav((prev) => !prev)
    }
  };
  const handleAiToggle = async (key: 'intrusion_detection' | 'people_count' | 'license_plate_detection', toggleValue: boolean,) => {

    const endpoint = toggleValue ? `/camera/stream/start?action=add&organizationId=${camera?.organization_id}`
      : `/camera/stream/stop?action=remove&organizationId=${camera?.organization_id}`;

    const res = await protectApi<any, { cameraId: number, serviceType: typeof key }>(endpoint, 'POST', { cameraId: Number(camera?.camera_id), serviceType: key })
    return res
  }
  const handleMotionToggle = async (toggleValue: boolean) => {
    const endpoint = toggleValue ? '/camera/motion/start' : '/camera/motion/stop'
    const res = await protectApi<any, { camId: number }>(endpoint, "POST", { camId: Number(camera?.camera_id) })
    return res
  }

  const handleRecordinToggle = async (isRecord: boolean) => {
  
    const url = isRecord
      ? `/camera/recording/start?action=add&organizationId=${camera?.organization_id}`
      : `/camera/recording/stop?action=remove&organizationId=${camera?.organization_id}`

    const res = await protectApi(url, "POST", { cameraId: Number(camera?.camera_id), serviceType: 'cloud_storage' })
    return res
  }
  const handleApplyFilter = async (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => {
    if (date && startTime && endTime) {
      const start = getUtcTimestamp(date, startTime)
      const end = getUtcTimestamp(date, endTime)
      const res = await fetchAlerts(alertOffset, start, end)

      setIsDateFiltered(true)
      setAlerts(res)
      setFilterDial(false)
    }
    return
  }
  const handleToggleStream = async (toggleValue: boolean) => {

    const url = toggleValue ? `/camera/start?action=add&hubId=${camera?.hub_id}` : `/camera/stop?action=remove&hubId=${camera?.hub_id}`
    const payload = {
      cameras: [
        {
          id: camera?.camera_id.toString(),
          macaddress: camera?.physical_address,
        },
      ],
    }
    const res = await protectApi<any, typeof payload>(url, "POST", payload)
    if (res.status === 200) {
      setStream(toggleValue)
    }
  }
  const handleSave = async () => {
    setIsEditLoading(true)
    const fallbackFolderId =
      formData.folderId && formData.folderId > 0
        ? formData.folderId
        : formData.subfolder && formData.subfolder > 0
          ? formData.subfolder
          : null;

    const payload: Partial<StreamFormData> = {
      name: formData.name,
      people_threshold_count: formData.people_threshold_count,
      organizationId: formData.organizationId,
      folderId: fallbackFolderId,
    };
    try {
      const res = await protectApi<any, Partial<StreamFormData>>(
        `camera?action=update&cameraId=${camera?.camera_id}`,
        'PUT',
        payload
      );

      if (res.status === 200) {
        setIsEdit(false)
        setFormData({
          name: '',
          people_threshold_count: 0,
          organizationId: '',
          folderId: -1,
          subfolder: -1
        })
      }

    } catch (error) {
      console.error(error)
    } finally {
      setIsEditLoading(false)
    }
  }

  const isFullscreen = useSelector((state: RootState) => state.camera.isFullScreen)

  if (loading) return <Spinner />
  return (
    <div className="h-full flex flex-col gap-3 md:gap-5 min-h-0 px-2 md:px-4 pt-2 md:pt-3">
      {/* Header Section */}
      {!isFullscreen && <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h1 className="sm:text-md md:text-lg lg:text-xl xl:text-2xl font-light ml-2 md:ml-5 whitespace-nowrap">
          {cameraLocation?.organization} {">"} {cameraLocation?.parantFolder === "NA" ? '' : cameraLocation?.parantFolder + " >"}  {camera?.name}
        </h1>

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

      {/* Main Content */}
      <div className={isFullscreen ? "relative top-0 left-0 right-0 w-full h-full" : "grid grid-cols-1 lg:grid-cols-6 gap-3 md:gap-4 min-h-0"}>
        {/* Left Column */}
        <div className="lg:col-span-4  flex flex-col gap-3 md:gap-5 h-full overflow-y-auto scrollbar-hide">
          <div className={isFullscreen ? 'w-full h-full' : "flex flex-col gap-3 md:gap-5 h-full "}>
            <CameraStreamCardMedium camera={camera} camLocation={cameraLocation} />

            {!isFullscreen && <div className="flex  flex-col p-3 md:p-6 rounded-2xl md:rounded-4xl bg-[var(--surface-100)]">
              <h3 className="text-sm md:text-md flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <IconVideo stroke={2} size={18} />
                <span>{t('alerts.recordings')}</span>
              </h3>
              <InfiniteScrolling<RecordedClip> setData={setRecordings} fetchData={fetchRecordings} setHasMore={setHasRecordingMore} setIsLoading={setRecordingLoading} setOffset={setRecordingOffset} offset={recordingOffset} isLoading={recordingLoading} data={recordings} divRef={recordingref} hasMore={hasRecordingMore}   >
                {recordings.length === 0 ? <p className="flex items-center justify-center w-full h-full">{t('streams.no_recordings')}</p> : <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
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

        {/* Right Column */}
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
      <TimeFiltersDialogue
        date={date}
        startTime={startTime}
        endTime={endTime}
        setDate={setDate}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        isOpen={filterDial}
        onClose={() => setFilterDial(false)}
        handleApplyFilter={handleApplyFilter}
      />
      {isEdit && <EditStreamDialog
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


      <StreamSettingsDialogue
        isOpen={settingDial}
        onClose={() => setSettingDial(false)}
        recordings={camera?.is_record !== 0}
        people={camera?.is_people_count_active !== 0}
        motion={camera?.is_motion_event_active !== 0}
        license={camera?.is_license_plate_detection_active !== 0}
        intrusion={camera?.is_intrusion_active !== 0}
        handleAiStremToggle={handleAiToggle}
        handleMotionToggle={handleMotionToggle}
        handleRecordingToggle={handleRecordinToggle}
      />
    </div>
  );
}

export default page;

///camera/start?action=add&hubId={}

//camera?action=update&cameraId={}